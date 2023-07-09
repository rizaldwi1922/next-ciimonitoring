const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const earthRadiusKm = 6371; // Radius bumi dalam kilometer
  
    // Mengubah derajat menjadi radian
    const dLat = degreesToRadians(lat2 - lat1);
    const dLon = degreesToRadians(lon2 - lon1);
  
    const radianLat1 = degreesToRadians(lat1);
    const radianLat2 = degreesToRadians(lat2);
  
    // Formula haversine
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(radianLat1) * Math.cos(radianLat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
    const distance = earthRadiusKm * c * 1000; // Jarak dalam meter
    return distance;
  }
  
  const degreesToRadians = (degrees: number): number => {
    return degrees * (Math.PI / 180);
  }

const getCIIRating = (score: number) => {
    score = isNaN(score) ? 0 : score;
    switch (true) {
        case score < 0.83:
          return 'A';
        case score < 0.94:
          return 'B';
        case score < 1.06:
          return 'C';
        case score < 1.19:
          return 'D';
        default:
          return 'E';
      }
}

export const calculateCII = (
        dwt:number, 
        dataParamCII: any, 
        lat:number, 
        lon:number, 
        focME: number, 
        focGE: number, 
) => {

    const nm = lat != 0 ? calculateDistance(lat, lon, dataParamCII.lastLat, dataParamCII.lastLon) : 0;
    const mulkom = 3.206;
    const Skomulatif = nm + dataParamCII.lastSKom;
    const focMEKomulatif = focME + dataParamCII.lastFocMEKom;
    const attainedME = (focMEKomulatif * mulkom)/(dwt * Skomulatif) * 10 ** 6;
    const focGEKomulatif = focGE + dataParamCII.lastFocGEKom;
    const attainedGE = (focGEKomulatif * mulkom) / (dwt * Skomulatif) * 10 ** 6;
    const attainedCII = attainedME + attainedGE;
    const CIIRef = 588 * (dwt ** -0.3885);
    const ReqCII = ((100 - 5) / 100) * CIIRef;
    const ReqCIIFOC = attainedCII / ReqCII;
    const CIIRating = getCIIRating(ReqCIIFOC);
    return {
        lastSKom: Skomulatif, 
        lastFocMEKom: focMEKomulatif, 
        lastFocGEKom: focGEKomulatif,
        rating: CIIRating,
        s: nm
    };
}