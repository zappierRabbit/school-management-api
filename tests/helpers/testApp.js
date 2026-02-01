const request = require("supertest");
const express = require("express");
const app = require("../../index"); // index should export app

module.exports = () => request(app);
