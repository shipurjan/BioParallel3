// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::Manager;
use tauri::{CustomMenuItem, Menu, MenuItem, Submenu};

fn main() {
    let load = CustomMenuItem::new("load_file".to_string(), "Load file...");
    let submenu = Submenu::new("File", Menu::new().add_item(load));
    let menu = Menu::new()
        .add_native_item(MenuItem::Copy)
        .add_submenu(submenu);
    tauri::Builder::default()
        .menu(menu)
        .invoke_handler(tauri::generate_handler![show_window, read_file])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
async fn show_window(window: tauri::Window) {
    window
        .get_window("BioParallel")
        .expect("no window labeled 'BioParallel' found")
        .show()
        .unwrap();
}

#[tauri::command]
async fn read_file(path: std::path::PathBuf) -> Result<Vec<u8>, String> {
  match std::fs::read(path) {
      Ok(data) => Ok(data),
      Err(err) => Err(format!("Failed to read file: {}", err)),
  }
}