use rocket::routes;
use rocket::get;
use rocket::fs::NamedFile;

#[get("/")]
async fn index() -> Option<NamedFile> {
    NamedFile::open("src/home/index.html").await.ok()
}

#[get("/style.css")]
async fn home_style_css() -> Option<NamedFile> {
    NamedFile::open("src/home/style.css").await.ok()
}

#[get("/index.js")]
async fn index_js() -> Option<NamedFile> {
    NamedFile::open("src/home/index.js").await.ok()
}

#[get("/res/pong.jpg")]
async fn pong_jpg() -> Option<NamedFile> {
    NamedFile::open("src/home/res/pong.jpg").await.ok()
}

#[get("/res/car.jpg")]
async fn car_jpg() -> Option<NamedFile> {
    NamedFile::open("src/home/res/car.jpg").await.ok()
}
#[get("/res/pong.gif")]
async fn pong_gif() -> Option<NamedFile> {
    NamedFile::open("src/home/res/pong.gif").await.ok()
}

#[get("/res/car.gif")]
async fn car_gif() -> Option<NamedFile> {
    NamedFile::open("src/home/res/car.gif").await.ok()
}


#[get("/pong_game")]
async fn pong_index() -> Option<NamedFile> {
    NamedFile::open("src/pong_game/index.html").await.ok()
}

#[get("/pong_game/estilo.css")]
async fn pong_css() -> Option<NamedFile> {
    NamedFile::open("src/pong_game/estilo.css").await.ok()
}

#[get("/pong_game/index.js")]
async fn pong_js() -> Option<NamedFile> {
    NamedFile::open("src/pong_game/index.js").await.ok()
}

#[get("/pong_game/res/musica_pong.mp3")]
async fn musica_pong() -> Option<NamedFile> {
    NamedFile::open("src/pong_game/res/musica_pong.mp3").await.ok()
}
#[get("/race_game")]
async fn race_car_index() -> Option<NamedFile> {
    NamedFile::open("src/race_car/index.html").await.ok()
}

#[get("/race_game/style.css")]
async fn race_car_css() -> Option<NamedFile> {
    NamedFile::open("src/race_car/style.css").await.ok()
}

#[get("/race_game/index.js")]
async fn race_car_js() -> Option<NamedFile> {
    NamedFile::open("src/race_car/index.js").await.ok()
}

#[get("/race_game/res/bg.jpg")]
async fn race_car_bg() -> Option<NamedFile> {
    NamedFile::open("src/race_car/res/bg.jpg").await.ok()
}

#[get("/race_game/res/car.png")]
async fn race_car_car() -> Option<NamedFile> {
    NamedFile::open("src/race_car/res/car.png").await.ok()
}

#[get("/race_game/res/car1.png")]
async fn race_car_car1() -> Option<NamedFile> {
    NamedFile::open("src/race_car/res/car1.png").await.ok()
}

#[get("/race_game/res/race_car.mp3")]
async fn race_car_music() -> Option<NamedFile> {
    NamedFile::open("src/race_car/res/race_car.mp3").await.ok()
}

#[get("/race_game/res/race_car_end.mp3")]
async fn race_car_end_music() -> Option<NamedFile> {
    NamedFile::open("src/race_car/res/race_car_end.mp3").await.ok()
}


#[rocket::main]
async fn main() {
    let _ = rocket::build()
        .configure(rocket::Config::figment()
           // .merge(("port", 8080))
        )
        .mount("/", routes![
            index, home_style_css, index_js, pong_jpg, car_jpg,
            pong_index, pong_css, pong_js, car_gif,pong_gif,musica_pong, race_car_index, race_car_css,race_car_js, race_car_bg, race_car_car, race_car_car1,race_car_music,race_car_end_music
        ])

        .launch()
        .await;
}
