#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use rand::Rng;
use std::fs;
use unicode_segmentation::UnicodeSegmentation;

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            open_website,
            save_string_to_disk,
            read_string_from_file,
            generate_passwords
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
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
    amount: u64,
    allow_duplicates: bool,
) -> Result<Vec<String>, String> {
    let mut password_list: Vec<String> = Vec::new();
    let mut max_count: f64 = 0.0;
    let char_count = character_set.graphemes(true).count();

    if !allow_duplicates {
        let mut current = min_length;
        while current <= max_length {
            max_count += (char_count as f64).powf(current as f64);
            current += 1;
        }
    }

    let mut rng = rand::thread_rng();
    let chars = character_set.chars();
    for _n in 0..amount {
        let mut can_continue = false;
        while !can_continue {
            let mut password = String::from("");
            let length = rng.gen_range(min_length..(max_length + 1));
            for _j in 0..length {
                let index = rng.gen_range(0..char_count);
                password.push(chars.clone().nth(index).unwrap());
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
