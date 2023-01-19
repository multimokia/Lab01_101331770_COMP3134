import fs from "fs";
import parser from "csv-parser";

if (fs.existsSync("./canada.txt")) {
    fs.rmSync("./canada.txt");
}

if (fs.existsSync("./usa.txt")) {
    fs.rmSync("./usa.txt");
}

// Read CSV
const rows = [];

fs.createReadStream("./input_countries.csv")
    .pipe(parser())
    .on("data", (data) => rows.push(data))
    .on("end", () => {
        let canadaOut = "country,year,population";
        let usaOut = "country,year,population";

        rows.filter(x => x.country === "Canada").forEach(val => canadaOut += `\n${val.country},${val.year},${val.population}`);
        rows.filter(x => x.country === "United States").forEach(val => usaOut += `\n${val.country},${val.year},${val.population}`);

        fs.writeFileSync("./canada.txt", canadaOut);
        fs.writeFileSync("./usa.txt", usaOut);
    });
