const {ElvClient} = require("elv-client-js");
const fs = require("fs");


const AddHDRMetadata = async (masterLibId, masterObjectId, fileName, hdrJson) => {

  const client = await ElvClient.FromConfigurationUrl({
    configUrl: process.env.FABRIC_CONFIG_URL
  });

// client.ToggleLogging(true);

  let wallet = client.GenerateWallet();
  let signer = wallet.AddAccount({
    privateKey: process.env.PRIVATE_KEY
  });
  await client.SetSigner({signer});

  console.log("Retrieving master metadata...");

  metadata = await client.ContentObjectMetadata({libraryId: masterLibId, objectId: masterObjectId});

// read from metadata top level key 'production_master'
  if (!metadata.production_master) {
    console.error(`top level metadata key "production_master" not found`);
    return
  }

  if (!metadata.production_master.sources[fileName]) {
    console.error("/production_master/sources/" + fileName + "/ not found in metadata");
    return
  }

  const streams = metadata.production_master.sources[fileName].streams

  let found = false;

  for (i = 0; i < streams.length; i++) {
    if (streams[i].type === "StreamVideo") {
      metadata.production_master.sources[fileName].streams[i].hdr = hdrJson;
      found = true;
    }
  }

  if (!found) {
    console.error("No video streams found in /production_master/sources/" + fileName);
    return
  }

  console.log("");
  console.log("Writing metadata back to object.");
  const {write_token} = await client.EditContentObject({
    libraryId: masterLibId,
    objectId: masterObjectId
  });
  response = await client.ReplaceMetadata({
    metadata: metadata,
    libraryId: masterLibId,
    objectId: masterObjectId,
    writeToken: write_token
  });
  response = await client.FinalizeContentObject({
    libraryId: masterLibId,
    objectId: masterObjectId,
    writeToken: write_token
  });

  console.log("");
  console.log("Done with AddHDRMetadata call.");
  console.log("");
  console.log("Added the following HDR metadata for " + fileName + ":");
  console.log("");
  console.log(JSON.stringify(hdrJson, null, 2));
  console.log("");
  console.log("New master hash to use when creating mezzanine: " + response.hash);

  console.log("");
};

const masterLibId = process.argv[2];
const masterObjectId = process.argv[3];
const fileName = process.argv[4];
const hdrJsonPath = process.argv[5];

if (!masterLibId || !masterObjectId || !fileName || !hdrJsonPath) {
  console.error(`
Usage: node add_hdr_metadata.js masterLibId masterObjectId masterFileName pathToHdrJsonFile

Sample HdrJsonFile contents:

{
  "master_display": "G(13250,34500)B(7500,3000)R(34000,16000)WP(15635,16450)L(40000000,50)",
  "max_cll": "1514,172"
}
`);
  return;
}

const privateKey = process.env.PRIVATE_KEY;
if (!privateKey) {
  console.error(`
PRIVATE_KEY environment variable must be specified
`);
  return;
}

const configUrl = process.env.FABRIC_CONFIG_URL;
if (!configUrl) {
  console.error(`
FABRIC_CONFIG_URL environment variable must be specified, e.g. for test fabric, export FABRIC_CONFIG_URL=https://main.net955210.contentfabric.io/config
`);
  return;
}

const hdrJson = JSON.parse(fs.readFileSync(hdrJsonPath));


AddHDRMetadata(
  masterLibId,
  masterObjectId,
  fileName,
  hdrJson
);
