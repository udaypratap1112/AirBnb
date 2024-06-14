const Listing = require("../modal/index");
const users = require("../modal/user.js");
const axios= require("axios")
const { data} = require("./data");
const { match } = require("assert");
const { func } = require("joi");

const mongoose =require('mongoose');
// console.log( new mongoose.Types.ObjectId('578df3efb618f5141202a196') );

const mapToken="pk.eyJ1IjoidWRheTExMTIiLCJhIjoiY2x2MmF6amI2MDlvdTJqcGYxbXQwNno0biJ9.mDiAVUU437EPkmABIpNN6g";

// const owner=ObjectId("666685259ee8c1e0d6b8079e7")
const cat = ["Rooms", "Lake", "Beach", "Mountains", "Pool", "Camping", "City"]

function randCategory(arr) {
    const randIndex = Math.floor(Math.random() * arr.length)
    
    return arr[randIndex]
}
// console.log(sampleData);
// randCategory(cat)
async function getOwner() {
  
    const owner = await users.find({ username: "uday" });
    return owner[0]._id
}





async function uploadSampleData(data,cat,cb) {
    await Listing.deleteMany({});
    const OWNER=await getOwner()
    
    for (let hotel of data) {
        const match =await axios.get(`https://api.mapbox.com/search/geocode/v6/forward?q=${hotel.location}&access_token=${mapToken}&limit=1`).then((resul)=>{
            return resul.data.features[0].geometry
          })
  
        const listing = new Listing({ ...hotel, geometry: match, owner: OWNER })
        listing.category = [cb(cat), cb(cat)]
        await listing.save()
        console.log(listing);
}
}

uploadSampleData(data,cat,randCategory)













// async function initdb() {
//   // await Listing.deleteMany({});
//   let data=bulk.data;
//   let finaldata=data.map((data)=>{
//     return({...data,owner:"659921c30e7bbc29c61f4f01"});
//   });

//   // finaldata=finaldata.map(async(data)=>{
//     // let newdata=[];
//     // for(let fdata of finaldata){

//     // let match = await geocodingClient.forwardGeocode({
//     //   query: fdata.location,
//     //   limit: 1
//     // }).send() 
//     // fdata.geometry=match.body.features[0].geometry;
//     // fdata.category=["Rooms"];

//     // newdata.push(fdata);
//     // }
//   // })
//   // Testing
//   let newdata = await Promise.all(finaldata.map(async (fdata) => {
//     let match = await geocodingClient.forwardGeocode({
//         query: fdata.location,
//         limit: 1
//     }).send();
//     fdata.geometry = match.body.features[0].geometry;
//     fdata.category = ["Rooms"];
//     return fdata;
//     }));
//     console.log(newdata);

//     // console.log(finaldata);

//   await Listing.insertMany(finaldata);
//   console.log("done");
// };
// initdb();


