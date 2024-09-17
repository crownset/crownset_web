// src/utils/location.js
// import os from 'os';
import macAddr from "macaddress-local-machine";

export const OFFICE_LOCATION = {
    // latitude: 28.49615,  // Example latitude
    // longitude: 77.53601 // Example longitude
    latitude : 28.5085489,
    longitude : 77.3789009
  };
  

  // src/utils/location.js
export function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371000; // Radius of Earth in meters
    const toRadians = (degrees) => (degrees * Math.PI) / 180;
    
    const lat1Rad = toRadians(lat1);
    const lon1Rad = toRadians(lon1);
    const lat2Rad = toRadians(lat2);
    const lon2Rad = toRadians(lon2);
    
    const dLat = lat2Rad - lat1Rad;
    const dLon = lon2Rad - lon1Rad;
    
    const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    
    return R * c; // Distance in meters
  }
  

// export async function macAddress() {
//   const networkInterfaces = os.networkInterfaces();

//   console.log("macaddress", networkInterfaces)
//   const macAddress = networkInterfaces.en0 ? networkInterfaces.en0[0].mac : 'Not found';
//   return macAddress
// }



export async function macAddress() {
  // Get the first MAC address
  const macAdd = macAddr.first();
  const macAddress = macAdd.macAddr
  console.log(macAddress);
  return macAddress
}