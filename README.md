# add_hdr_metadata.js
Adds HDR info to a production master's metadata for one file within the master

**Installation:**
```
git clone https://github.com/eluv-io/add_hdr_metadata
cd add_hdr_metadata
npm install
```


**Usage:**

```
export PRIVATE_KEY=(your_fabric_private_key)
export FABRIC_CONFIG_URL=(url) # e.g. https://demov3.net955210.contentfabric.io/config for the Eluvio demo network

node add_hdr_metadata.js MASTER_LIB_ID MASTER_OBJECT_ID FILENAME PATH_TO_HDR_JSON_FILE
```

**Example HDR JSON file contents:**
```
{
  "master_display": "G(13250,34500)B(7500,3000)R(34000,16000)WP(15635,16450)L(40000000,50)",
  "max_cll": "1514,172"
}
```

**Worksheet for constructing JSON file contents**

The spreadsheet linked below shows how to convert HDR10 values into HEVC values and how they are assembled into the JSON metadata (make a copy of the spreadsheet if you want to plug in your own values)

https://docs.google.com/spreadsheets/d/1hXVGVnDU7oSjGsaQFVG1zQGgQCM_D75rkM8Z1xVZR8A/edit?usp=sharing
