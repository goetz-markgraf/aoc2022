package main

import (
	"io/ioutil"
	"log"
	"strings"
)

func readLines(filename string) []string {
	fileContent, err := ioutil.ReadFile("../input_hidden/" + filename)
	if err != nil {
		log.Fatal(err)
	}

	text := string(fileContent)
	lines := strings.Split(text, "\n")
	if strings.TrimSpace(lines[len(lines)-1]) == "" {
		return lines[0 : len(lines)-1]
	} else {
		return lines
	}
}
