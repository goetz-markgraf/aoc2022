package main

import (
	"fmt"
	"strconv"
	"strings"
)

var testInput18 = []string{
	"2,2,2",
	"1,2,2",
	"3,2,2",
	"2,1,2",
	"2,3,2",
	"2,2,1",
	"2,2,3",
	"2,2,4",
	"2,2,6",
	"1,2,5",
	"3,2,5",
	"2,1,5",
	"2,3,5",
}

func day18() {
	fmt.Println("**** Day 18")
	fmt.Println("Part 1")
	result1 := day18_1(testInput18)
	fmt.Println("Test => ", result1)

	input1 := readLines("day18.input")
	result11 := day18_1(input1)
	fmt.Println("Production => ", result11)
}

type Pos3D struct {
	x int
	y int
	z int
}

func createPos(line string) Pos3D {
	values := strings.Split(line, ",")
	x, _ := strconv.Atoi(values[0])
	y, _ := strconv.Atoi(values[1])
	z, _ := strconv.Atoi(values[2])
	return Pos3D{x, y, z}
}

func adjacent(q1 Pos3D, q2 Pos3D) bool {
	if q1.x == q2.x-1 && q1.y == q2.y && q1.z == q2.z {
		return true
	}
	if q1.x == q2.x+1 && q1.y == q2.y && q1.z == q2.z {
		return true
	}
	if q1.x == q2.x && q1.y == q2.y-1 && q1.z == q2.z {
		return true
	}
	if q1.x == q2.x && q1.y == q2.y+1 && q1.z == q2.z {
		return true
	}
	if q1.x == q2.x && q1.y == q2.y && q1.z == q2.z-1 {
		return true
	}
	if q1.x == q2.x && q1.y == q2.y && q1.z == q2.z+1 {
		return true
	}
	return false
}

func day18_1(input []string) int {
	amountCubes := len(input)
	cubes := make([]Pos3D, 0)
	for i := 0; i < amountCubes; i++ {
		newCube := createPos(input[i])
		cubes = append(cubes, newCube)
	}
	sides := amountCubes * 6

	for i := 0; i < amountCubes; i++ {
		for j := 0; j < amountCubes; j++ {
			if i != j && adjacent(cubes[i], cubes[j]) {
				sides = sides - 1
			}
		}
	}

	return sides
}
