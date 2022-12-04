package main

import (
	"io/ioutil"
	"log"
	"strings"
)

func readLines(filename string) []string {
	fileContent, err := ioutil.ReadFile("../input/" + filename)
	if err != nil {
		log.Fatal(err)
	}

	text := string(fileContent)
	lines := strings.Split(text, "\n")
	return lines
}
