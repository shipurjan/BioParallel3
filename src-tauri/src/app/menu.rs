use crate::utils;
use tauri::{CustomMenuItem, Manager, Menu, MenuItem, Submenu, WindowMenuEvent};

static NAME: &str = "BioParallel";

pub fn init() -> Menu {
    let file_menu = Submenu::new(
        "File",
        Menu::with_items([
            CustomMenuItem::new("save", "Save").into(),
            CustomMenuItem::new("open", "Open").into(),
            MenuItem::Separator.into(),
            MenuItem::Quit.into(),
        ]),
    );

    let edit_menu = Submenu::new(
        "Edit",
        Menu::new()
            .add_native_item(MenuItem::Undo)
            .add_native_item(MenuItem::Redo)
            .add_native_item(MenuItem::Separator)
            .add_native_item(MenuItem::Cut)
            .add_native_item(MenuItem::Copy)
            .add_native_item(MenuItem::Paste)
            .add_native_item(MenuItem::SelectAll),
    );

    let help_menu = Submenu::new(
        "Help",
        Menu::with_items([
            #[cfg(target_os = "macos")]
            MenuItem::About(NAME.into(), AboutMetadata::default()).into(),
            #[cfg(not(target_os = "macos"))]
            CustomMenuItem::new("about", format!("About {NAME}")).into(),
        ]),
    );

    Menu::new()
        .add_submenu(file_menu)
        .add_submenu(edit_menu)
        .add_submenu(help_menu)
}

pub fn menu_handler(event: WindowMenuEvent<tauri::Wry>) {
    let win = Some(event.window()).unwrap();
    let app = win.app_handle();
    let menu_id = event.menu_item_id();

    match menu_id {
        "about" => {
            let tauri_conf = utils::get_tauri_conf().unwrap();
            tauri::api::dialog::message(
                app.get_window("core").as_ref(),
                NAME,
                format!(
                    "{}\nVersion {}\n\n{}\n{}",
                    option_env!("CARGO_PKG_DESCRIPTION").unwrap(),
                    tauri_conf.package.version.unwrap(),
                    option_env!("CARGO_PKG_AUTHORS").unwrap(),
                    option_env!("CARGO_PKG_REPOSITORY").unwrap()
                ),
            );
        }
        "exit" => {
            event.window().close().unwrap();
        }
        _ => {}
    }
}
