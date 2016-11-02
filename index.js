var Skb = require('skb');

var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ODFhMjBkMjZmZjc3NjAwMTJiNjc4M2QiLCJ1c2VybmFtZSI6InNpbmZ4QHlhLnJ1Iiwicm9sZSI6InVzZXIiLCJpYXQiOjE0NzgxMDczNDh9.VzS5r0jfFaYdtJdVOfa9w2A8y_8Vpr2PtGf2u0rV5BA';
var skb = new Skb(token);

skb.taskHelloWorld('Все идет по плану');