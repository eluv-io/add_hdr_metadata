# add_hdr_metadata.js
Adds HDR info to a production master's metadata for one file within the master

**Installation:**
```
git clone https://github.com/qluvio/add_hdr_metadata
cd add_hdr_metadata
npm install
```


**Usage:**

```
export PRIVATE_KEY=(your_fabric_private_key)
export FABRIC_CONFIG_URL=(url) # e.g. https://main.net955210.contentfabric.io/config for the Eluvio test network

node add_hdr_metadata.js MASTER_LIB_ID MASTER_OBJECT_ID FILENAME PATH_TO_HDR_JSON_FILE
```

**Example HDR JSON file contents:**
```
{
  "master_display": "G(13250,34500)B(7500,3000)R(34000,16000)WP(15635,16450)L(40000000,50)",
  "max_cll": "1514,172"
}
```
