use std::fs::File;
use std::io;
use std::io::BufRead;
use std::path::Path;

pub fn read_lines(filename: &str) -> io::Result<io::Lines<io::BufReader<File>>> {
    let path = format!("../input_hidden/{}", filename);
    let path = Path::new(&path);
    let file = File::open(path)?;
    Ok(io::BufReader::new(file).lines())
}
