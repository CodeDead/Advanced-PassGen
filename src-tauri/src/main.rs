#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use std::fs;

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![open_website, save_string_to_disk])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}

#[tauri::command]
fn open_website(website: &str) -> Result<String, String> {
  match open::that(website) {
    Ok(_) => {
      Ok(String::from("Success"))
    }
    Err(e) => {
      Err(e.to_string())
    }
  }
}

#[tauri::command]
fn save_string_to_disk(content: &str, path: &str) -> Result<String, String> {
  match fs::write(path, content) {
    Ok(_) => Ok(String::from("Success")),
    Err(e) => Err(e.to_string()),
  }
}
