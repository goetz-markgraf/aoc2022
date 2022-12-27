use std::collections::HashMap;
use std::fs::File;
use std::io::{BufReader, Lines};
use std::slice::Iter;

use crate::day21::Expr::{Expression, Literal};
use crate::day21::Operation::{Div, Minus, Mul, Plus};
use crate::util::read_lines;

#[derive(Debug)]
enum Operation {
    Plus,
    Minus,
    Mul,
    Div,
}

#[derive(Debug)]
enum Expr {
    Literal(i128),
    Expression(String, Operation, String),
}

impl Expr {
    fn evaluate(&self, scope: &HashMap<String, Expr>) -> i128 {
        match self {
            Literal(i) => i.to_owned(),
            Expression(a, op, b) => {
                let a = scope.get(a).expect("{} should be in scope");
                let b = scope.get(b).expect("{} should be in scope");
                match op {
                    Plus => a.evaluate(scope) + b.evaluate(scope),
                    Minus => a.evaluate(scope) - b.evaluate(scope),
                    Mul => a.evaluate(scope) * b.evaluate(scope),
                    Div => a.evaluate(scope) / b.evaluate(scope)
                }
            }
        }
    }
}

pub fn day21() {
    println!("Day 21 – part 1");

    let input = read_lines("day21_test.input").expect("test input file should be there");

    let result = day21_1(input);
    println!("Test: {result}");

    let input = read_lines("day21.input").expect("file should be able to be read");
    let result = day21_1(input);
    println!("Real Thing: {result}")
}

fn create_expr(expr: &str) -> Expr {
    let parts: Vec<&str> = expr.split(' ').collect();
    let name1 = String::from(parts[0]);
    let name2 = String::from(parts[2]);
    let op = match parts[1] {
        "+" => Plus,
        "-" => Minus,
        "/" => Div,
        _ => Mul
    };

    Expression(name1, op, name2)
}

fn parse_line(line: &str) -> (String, Expr) {
    let parts: Vec<&str> = line.split(": ").collect();
    let name = String::from(parts[0]);
    let expr = String::from(parts[1]);

    let expr = match expr.trim().parse() {
        Ok(n) => Literal(n),
        Err(_) => create_expr(&expr)
    };

    (name, expr)
}

fn day21_1(input: Lines<BufReader<File>>) -> i128 {
    let mut scope = HashMap::new();
    for line in input {
        let tuple = parse_line(&line.expect("line should exist"));
        scope.insert(tuple.0, tuple.1);
    }

    let root = scope.get("root").expect("root should be in scope");
    root.evaluate(&scope)
}

#[cfg(test)]
mod tests {
    use std::collections::HashMap;

    use crate::day21::{create_expr, parse_line};

    #[test]
    fn should_find_expression() {
        let result = create_expr("a + b");
        println!("Result1: {:?}", result)
    }

    #[test]
    fn should_parse_lines() {
        let result = parse_line("a: 10");
        println!("Var: {}, Expression: {:?}", result.0, result.1);
        let result = parse_line("a: b / c");
        println!("Var: {}, Expression: {:?}", result.0, result.1)
    }

    #[test]
    fn evaluate() {
        let mut scope = HashMap::new();
        let expr1 = parse_line("a: 10");
        let expr2 = parse_line("b: 20");
        let expr3 = parse_line("c: a + b");
        scope.insert(expr1.0, expr1.1);
        scope.insert(expr2.0, expr2.1);
        scope.insert(expr3.0, expr3.1);

        let c = scope.get("c").expect("c should be in scope");
        let result = c.evaluate(&scope);

        assert_eq!(result, 30)
    }
}
