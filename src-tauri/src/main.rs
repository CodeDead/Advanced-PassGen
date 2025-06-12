#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use rand::Rng;
use std::fs;
use unicode_segmentation::UnicodeSegmentation;

fn main() {
    // Fix for NVIDIA
    unsafe {
        std::env::set_var("__GL_THREADED_OPTIMIZATIONS", "0");
        std::env::set_var("__NV_DISABLE_EXPLICIT_SYNC", "1");
    }

    tauri::Builder::default()
        .plugin(tauri_plugin_os::init())
        .plugin(tauri_plugin_clipboard_manager::init())
        .plugin(tauri_plugin_dialog::init())
        .invoke_handler(tauri::generate_handler![
            open_website,
            save_string_to_disk,
            read_string_from_file,
            generate_passwords,
            exit_app
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn exit_app() {
    std::process::exit(0x0);
}

#[tauri::command]
fn open_website(website: &str) -> Result<String, String> {
    match open::that(website) {
        Ok(_) => Ok(String::from("Success")),
        Err(e) => Err(e.to_string()),
    }
}

#[tauri::command]
fn save_string_to_disk(content: &str, path: &str) -> Result<String, String> {
    match fs::write(path, content) {
        Ok(_) => Ok(String::from("Success")),
        Err(e) => Err(e.to_string()),
    }
}

#[tauri::command]
async fn read_string_from_file(path: &str) -> Result<String, String> {
    match fs::read_to_string(path) {
        Ok(s) => Ok(s),
        Err(e) => Err(e.to_string()),
    }
}

#[tauri::command]
async fn generate_passwords(
    min_length: u64,
    max_length: u64,
    character_set: &str,
    include_symbols: &str,
    amount: u64,
    allow_duplicates: bool,
) -> Result<Vec<String>, String> {
    let mut password_list: Vec<String> = Vec::new();
    let mut max_count: f64 = 0.0;

    let mut total_character_set = String::from(character_set);
    total_character_set.push_str(include_symbols);

    let graphemes = total_character_set.graphemes(true);
    let char_count = graphemes.clone().count();

    if !allow_duplicates {
        let mut current = min_length;
        while current <= max_length {
            max_count += (char_count as f64).powf(current as f64);
            current += 1;
        }
    }

    let mut rng = rand::rng();
    let chars = graphemes.collect::<Vec<&str>>();
    for _n in 0..amount {
        let mut can_continue = false;
        while !can_continue {
            let mut password = String::from("");
            let length = rng.random_range(min_length..(max_length + 1));
            for _j in 0..length {
                let index = rng.random_range(0..char_count);
                password.push_str(chars.clone()[index]);
            }

            if allow_duplicates || (!allow_duplicates && !password_list.contains(&password)) {
                password_list.push(password);
                can_continue = true;
            }

            if !can_continue && !allow_duplicates && password_list.len() as f64 == max_count {
                return Ok(password_list);
            }
        }
    }

    Ok(password_list)
}
