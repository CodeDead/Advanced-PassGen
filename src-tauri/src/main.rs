#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use rand::RngExt;
use std::{collections::HashSet, fmt::Display, fs};
use unicode_segmentation::UnicodeSegmentation;

type CommandResult<T> = Result<T, String>;

#[cfg(target_os = "linux")]
fn configure_linux_environment() {
    // SAFETY: This runs during application startup before any threads are spawned
    // and only sets a fixed process-wide environment variable needed on Linux.
    unsafe {
        std::env::set_var("__NV_DISABLE_EXPLICIT_SYNC", "1");
    }
}

fn map_command_result<T, E>(result: Result<T, E>) -> CommandResult<T>
where
    E: Display,
{
    result.map_err(|error| error.to_string())
}

fn as_platform_size(value: u64, field_name: &str) -> CommandResult<usize> {
    usize::try_from(value).map_err(|_| format!("{field_name} is too large for this platform."))
}

fn count_unique_passwords(min_length: usize, max_length: usize, grapheme_count: usize) -> usize {
    let mut total = 0usize;

    for length in min_length..=max_length {
        let combinations = u32::try_from(length)
            .ok()
            .and_then(|value| grapheme_count.checked_pow(value))
            .unwrap_or(usize::MAX);

        total = total.saturating_add(combinations);
        if total == usize::MAX {
            break;
        }
    }

    total
}

fn main() {
    #[cfg(target_os = "linux")]
    configure_linux_environment();

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
fn open_website(website: &str) -> CommandResult<()> {
    map_command_result(open::that(website))
}

#[tauri::command]
fn save_string_to_disk(content: &str, path: &str) -> CommandResult<()> {
    map_command_result(fs::write(path, content))
}

#[tauri::command]
fn read_string_from_file(path: &str) -> CommandResult<String> {
    map_command_result(fs::read_to_string(path))
}

#[tauri::command]
fn generate_passwords(
    min_length: u64,
    max_length: u64,
    character_set: &str,
    include_symbols: &str,
    amount: u64,
    allow_duplicates: bool,
) -> CommandResult<Vec<String>> {
    let min_length = as_platform_size(min_length, "Minimum length")?;
    let max_length = as_platform_size(max_length, "Maximum length")?;
    let requested_amount = as_platform_size(amount, "Password amount")?;

    if min_length > max_length {
        return Err("Minimum length cannot be greater than maximum length.".into());
    }

    if requested_amount == 0 {
        return Ok(Vec::new());
    }

    let total_character_set = format!("{character_set}{include_symbols}");
    let graphemes = total_character_set.graphemes(true).collect::<Vec<&str>>();
    let grapheme_count = graphemes.len();

    if grapheme_count == 0 {
        return Ok(Vec::new());
    }

    let target_amount = if allow_duplicates {
        requested_amount
    } else {
        requested_amount.min(count_unique_passwords(
            min_length,
            max_length,
            grapheme_count,
        ))
    };

    if target_amount == 0 {
        return Ok(Vec::new());
    }

    let mut password_list = Vec::with_capacity(target_amount);
    let mut seen_passwords = (!allow_duplicates).then(|| HashSet::with_capacity(target_amount));
    let mut rng = rand::rng();

    while password_list.len() < target_amount {
        let length = rng.random_range(min_length..=max_length);
        let mut password = String::new();

        for _ in 0..length {
            let index = rng.random_range(0..grapheme_count);
            password.push_str(graphemes[index]);
        }

        if let Some(seen_passwords) = seen_passwords.as_mut() {
            if !seen_passwords.insert(password.clone()) {
                continue;
            }
        }

        password_list.push(password);
    }

    Ok(password_list)
}
