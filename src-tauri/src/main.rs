#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![open_website])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}

#[tauri::command]
fn open_website(website: &str) {
  match open::that(website) {
    Ok(_) => {}
    Err(e) => {
      println!("Error: {}", e);
    }
  }
}
