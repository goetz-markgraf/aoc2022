package main

import (
	"fmt"
	"log"
	"sort"
	"strconv"
)

var testInput = []string{"1000", "2000", "3000", "", "4000", "", "5000", "6000", "", "7000", "8000", "9000", "", "10000"}

func day1() {
	fmt.Println("**** Day 1")
	fmt.Println("Part 1")
	day1_1()

	fmt.Println("Part 2")
	day1_2()
}

func day1_1() {
	testResult := produceResult1(testInput)
	fmt.Printf("Test: %v\n", testResult)

	input := readLines("day1.input")
	result := produceResult1(input)
	fmt.Printf("Result: %v\n", result)
}

func day1_2() {
	testResult := produceResult2(testInput)
	fmt.Printf("Test: %v\n", testResult)

	input := readLines("day1.input")
	result := produceResult2(input)
	fmt.Printf("Result: %v\n", result)
}

func produceResult1(input []string) int {
	buckets := createBuckets(input)
	elves := calculateCalories(buckets)
	sort.Ints(elves)
	return elves[len(elves)-1]
}

func produceResult2(input []string) int {
	buckets := createBuckets(input)
	elves := calculateCalories(buckets)
	sort.Ints(elves)
	return elves[len(elves)-1] + elves[len(elves)-2] + elves[len(elves)-3]
}

func createBuckets(input []string) [][]string {
	ret := [][]string{}
	current := []string{}

	for _, item := range input {
		if item == "" {
			ret = append(ret, current)
			current = []string{}
		} else {
			current = append(current, item)
		}
	}
	ret = append(ret, current)

	return ret
}

func calculateCalories(buckets [][]string) []int {
	ret := []int{}

	for _, bucket := range buckets {
		cal := 0
		for _, value := range bucket {
			calorie, err := strconv.Atoi(value)
			if err != nil {
				log.Fatalf("%v is not an int", value)
			}
			cal += calorie
		}
		ret = append(ret, cal)
	}

	return ret
}
