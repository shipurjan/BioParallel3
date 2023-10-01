// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::Manager;



fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![show_window, read_file, handle_dropped_files])
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

#[tauri::command]
fn handle_dropped_files(files: Vec<std::path::PathBuf>) {
    for file_path in files {
        // Now, `file_path` contains the absolute path of the dropped file
        println!("Dropped file path: {:?}", file_path);
        // You can perform further actions with the absolute file path
    }
}