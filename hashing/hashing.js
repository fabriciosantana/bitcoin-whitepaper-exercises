"use strict";

var crypto = require("crypto");

// The Power of a Smile
// by Tupac Shakur
var poem = [
	"The power of a gun can kill",
	"and the power of fire can burn",
	"the power of wind can chill",
	"and the power of a mind can learn",
	"the power of anger can rage",
	"inside until it tears u apart",
	"but the power of a smile",
	"especially yours can heal a frozen heart",
];

var Blockchain = {
	blocks: [],
};

// Genesis block
Blockchain.blocks.push({
	index: 0,
	hash: crypto.createHash("sha256").update("hello world!").digest("hex"),
	data: "this is just the begining",
	timestamp: Date.now(),
});

console.log(Blockchain.blocks[Blockchain.blocks.length-1])
console.log(`Block is valid: ${verifyBlock(Blockchain.blocks[Blockchain.blocks.length-1])}`);

for (let line of poem) {

	Blockchain.blocks.push(
		createBlock(line)
	)
	console.log(Blockchain.blocks[Blockchain.blocks.length-1])
	console.log(`Block ${Blockchain.blocks.length-1} is valid: ${verifyBlock(Blockchain.blocks[Blockchain.blocks.length-1])}`);
}


console.log(`Blockchain is valid: ${verifyChain(Blockchain)}`);

// **********************************

function createBlock(data){

	let newBlock = {
		index: Blockchain.blocks.length,
		prevHash: Blockchain.blocks[Blockchain.blocks.length-1].hash,
		data: data,
		timestamp: Date.now()
	}

	newBlock.hash = blockHash(newBlock)	

	return newBlock;
}

function blockHash(bl) {
	return crypto.createHash("sha256").update(
		`${bl.index};${bl.prevHash};${JSON.stringify(bl.data)};${bl.timestamp}`
	).digest("hex");
}

function verifyBlock(bl) {
	if (bl.data == null) return false;
	if (bl.index === 0) {
		if (bl.hash !== "7509e5bda0c762d2bac7f90d758b5b2263fa01ccbc542ab5e3df163be08e6ca9") return false;
	}
	else {
		if (!bl.prevHash) return false;
		if (!(
			typeof bl.index === "number" &&
			Number.isInteger(bl.index) &&
			bl.index > 0
		)) {
			return false;
		}
		if (bl.hash !== blockHash(bl)) return false;
	}

	return true;
}

function verifyChain(chain) {
	var prevHash;
	for (let bl of chain.blocks) {
		if (prevHash && bl.prevHash !== prevHash) return false;
		if (!verifyBlock(bl)) return false;
		prevHash = bl.hash;
	}

	return true;
}
