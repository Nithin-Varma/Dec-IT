const main = async() => {
  
  const upload = await hre.ethers.getContractFactory("Dec_File");
  const uploading = await upload.deploy();

  await uploading.deployed();

  console.log("deployed address: ", uploading.address)
}

const runMain = async() => {
  try {
    await main();
    process.exit(0);
  }
  catch(error) {
    console.log(error);
    process.exit(1);

  }
}

runMain();