import request from "supertest";
import app from "../app";
import { Park } from "../types/CustomTypes";
import { seedDatabase } from "../db/seed/seed";

beforeEach(() => seedDatabase());

describe("parks filters", () => {
  describe("Can filter parks by city", () => {
    test("should return an object, containing array of objects", () => {
      return request(app)
        .get("/api/parks?city=Birmingham")
        .expect(200)
        .then((res) => {
          expect(Array.isArray(res.body)).toBe(true);
          expect(res.body.length).toBe(1);
          expect(res.body[0].address.city).toBe("Birmingham");
        });
    });
    test("should return cities adhering to the query", () => {
      return request(app)
        .get("/api/parks?city=Birmingham")
        .expect(200)
        .then((res) => {
          expect(res.body.length).toBe(1);
          res.body.forEach((park: Park) => {
            expect(park.address.city).toBe("Birmingham");
          });
        });
    });
  });
  describe("Can filter parks by isFree", () => {
    test("should return an array", () => {
      return request(app)
        .get("/api/parks?isFree=true")
        .expect(200)
        .then((res) => {
          expect(Array.isArray(res.body)).toBe(true);
          expect(res.body.length).toBe(4);
        });
    });
    test("returned array should contain park objects ", () => {
      return request(app)
        .get("/api/parks?isFree=true")
        .expect(200)
        .then((res) => {
          res.body.forEach((park: Park) => {
            expect(typeof park.name).toBe("string");
            expect(typeof park.desc).toBe("string");
            expect(typeof park.size).toBe("number");
            expect(typeof park.current_average_rating).toBe("number");
            expect(typeof park.current_review_count).toBe("number");
            expect(Array.isArray(park.features)).toBe(false);
            expect(typeof park.features).toBe("object");
            expect(typeof park.opening_hours).toBe("object");
            expect(typeof park.opening_hours.monday).toBe("string");
            expect(typeof park.opening_hours.tuesday).toBe("string");
            expect(typeof park.opening_hours.wednesday).toBe("string");
            expect(typeof park.opening_hours.thursday).toBe("string");
            expect(typeof park.opening_hours.friday).toBe("string");
            expect(typeof park.opening_hours.saturday).toBe("string");
            expect(typeof park.opening_hours.sunday).toBe("string");
            expect(typeof park.address).toBe("object");
            expect(typeof park.address.firstLine).toBe("string");
            expect(typeof park.address.secondLine).toBe("string");
            expect(typeof park.address.postCode).toBe("string");
            expect(typeof park.address.city).toBe("string");
            expect(typeof park.location).toBe("object");
            expect(typeof park.location.long).toBe("string");
            expect(typeof park.location.lat).toBe("string");
            expect(typeof park.image_url).toBe("string");
            expect(typeof park.website_url).toBe("string");
            expect(typeof park.phone_number).toBe("string");
          });
        });
    });
    test("expect all returned parks to have isFree = true", () => {
      return request(app)
        .get("/api/parks?isFree=true")
        .expect(200)
        .then((res) => {
          res.body.forEach((park: Park) => {
            expect(park.features.isFree).toBe(true);
          });
        });
    });
  });
  describe("Can filter parks by isWellLit", () => {
    test("should return an array", () => {
      return request(app)
        .get("/api/parks?isWellLit=true")
        .expect(200)
        .then((res) => {
          expect(Array.isArray(res.body)).toBe(true);
          expect(res.body.length).toBe(4);
        });
    });
    test("returned array should contain park objects ", () => {
      return request(app)
        .get("/api/parks?isWellLit=true")
        .expect(200)
        .then((res) => {
          res.body.forEach((park: Park) => {
            expect(typeof park.name).toBe("string");
            expect(typeof park.desc).toBe("string");
            expect(typeof park.size).toBe("number");
            expect(typeof park.current_average_rating).toBe("number");
            expect(typeof park.current_review_count).toBe("number");
            expect(Array.isArray(park.features)).toBe(false);
            expect(typeof park.features).toBe("object");
            expect(typeof park.opening_hours).toBe("object");
            expect(typeof park.opening_hours.monday).toBe("string");
            expect(typeof park.opening_hours.tuesday).toBe("string");
            expect(typeof park.opening_hours.wednesday).toBe("string");
            expect(typeof park.opening_hours.thursday).toBe("string");
            expect(typeof park.opening_hours.friday).toBe("string");
            expect(typeof park.opening_hours.saturday).toBe("string");
            expect(typeof park.opening_hours.sunday).toBe("string");
            expect(typeof park.address).toBe("object");
            expect(typeof park.address.firstLine).toBe("string");
            expect(typeof park.address.secondLine).toBe("string");
            expect(typeof park.address.postCode).toBe("string");
            expect(typeof park.address.city).toBe("string");
            expect(typeof park.location).toBe("object");
            expect(typeof park.location.long).toBe("string");
            expect(typeof park.location.lat).toBe("string");
            expect(typeof park.image_url).toBe("string");
            expect(typeof park.website_url).toBe("string");
            expect(typeof park.phone_number).toBe("string");
          });
        });
    });
    test("expect all returned parks to have isWellLit = true", () => {
      return request(app)
        .get("/api/parks?isWellLit=true")
        .expect(200)
        .then((res) => {
          res.body.forEach((park: Park) => {
            expect(park.features.isWellLit).toBe(true);
          });
        });
    });
  });
  describe("Can filter parks by isFreeParking", () => {
    test("should return an array", () => {
      return request(app)
        .get("/api/parks?isFreeParking=true")
        .expect(200)
        .then((res) => {
          expect(Array.isArray(res.body)).toBe(true);
          expect(res.body.length).toBe(4);
        });
    });
    test("returned array should contain park objects ", () => {
      return request(app)
        .get("/api/parks?isFreeParking=true")
        .expect(200)
        .then((res) => {
          res.body.forEach((park: Park) => {
            expect(typeof park.name).toBe("string");
            expect(typeof park.desc).toBe("string");
            expect(typeof park.size).toBe("number");
            expect(typeof park.current_average_rating).toBe("number");
            expect(typeof park.current_review_count).toBe("number");
            expect(Array.isArray(park.features)).toBe(false);
            expect(typeof park.features).toBe("object");
            expect(typeof park.opening_hours).toBe("object");
            expect(typeof park.opening_hours.monday).toBe("string");
            expect(typeof park.opening_hours.tuesday).toBe("string");
            expect(typeof park.opening_hours.wednesday).toBe("string");
            expect(typeof park.opening_hours.thursday).toBe("string");
            expect(typeof park.opening_hours.friday).toBe("string");
            expect(typeof park.opening_hours.saturday).toBe("string");
            expect(typeof park.opening_hours.sunday).toBe("string");
            expect(typeof park.address).toBe("object");
            expect(typeof park.address.firstLine).toBe("string");
            expect(typeof park.address.secondLine).toBe("string");
            expect(typeof park.address.postCode).toBe("string");
            expect(typeof park.address.city).toBe("string");
            expect(typeof park.location).toBe("object");
            expect(typeof park.location.long).toBe("string");
            expect(typeof park.location.lat).toBe("string");
            expect(typeof park.image_url).toBe("string");
            expect(typeof park.website_url).toBe("string");
            expect(typeof park.phone_number).toBe("string");
          });
        });
    });
    test("expect all returned parks to have isFreeParking = true", () => {
      return request(app)
        .get("/api/parks?isFreeParking=true")
        .expect(200)
        .then((res) => {
          res.body.forEach((park: Park) => {
            expect(park.features.isFreeParking).toBe(true);
          });
        });
    });
  });
  describe("Can filter parks by isParking", () => {
    test("should return an array", () => {
      return request(app)
        .get("/api/parks?isParking=true")
        .expect(200)
        .then((res) => {
          expect(Array.isArray(res.body)).toBe(true);
          expect(res.body.length).toBe(7);
        });
    });
    test("returned array should contain park objects ", () => {
      return request(app)
        .get("/api/parks?isParking=true")
        .expect(200)
        .then((res) => {
          res.body.forEach((park: Park) => {
            expect(typeof park.name).toBe("string");
            expect(typeof park.desc).toBe("string");
            expect(typeof park.size).toBe("number");
            expect(typeof park.current_average_rating).toBe("number");
            expect(typeof park.current_review_count).toBe("number");
            expect(Array.isArray(park.features)).toBe(false);
            expect(typeof park.features).toBe("object");
            expect(typeof park.opening_hours).toBe("object");
            expect(typeof park.opening_hours.monday).toBe("string");
            expect(typeof park.opening_hours.tuesday).toBe("string");
            expect(typeof park.opening_hours.wednesday).toBe("string");
            expect(typeof park.opening_hours.thursday).toBe("string");
            expect(typeof park.opening_hours.friday).toBe("string");
            expect(typeof park.opening_hours.saturday).toBe("string");
            expect(typeof park.opening_hours.sunday).toBe("string");
            expect(typeof park.address).toBe("object");
            expect(typeof park.address.firstLine).toBe("string");
            expect(typeof park.address.secondLine).toBe("string");
            expect(typeof park.address.postCode).toBe("string");
            expect(typeof park.address.city).toBe("string");
            expect(typeof park.location).toBe("object");
            expect(typeof park.location.long).toBe("string");
            expect(typeof park.location.lat).toBe("string");
            expect(typeof park.image_url).toBe("string");
            expect(typeof park.website_url).toBe("string");
            expect(typeof park.phone_number).toBe("string");
          });
        });
    });
    test("expect all returned parks to have isParking = true", () => {
      return request(app)
        .get("/api/parks?isParking=true")
        .expect(200)
        .then((res) => {
          res.body.forEach((park: Park) => {
            expect(park.features.isParking).toBe(true);
          });
        });
    });
  });
  describe("Can filter parks by hasAgilityEquipment", () => {
    test("should return an array", () => {
      return request(app)
        .get("/api/parks?hasAgilityEquipment=true")
        .expect(200)
        .then((res) => {
          expect(Array.isArray(res.body)).toBe(true);
          expect(res.body.length).toBe(1);
        });
    });
    test("returned array should contain park objects ", () => {
      return request(app)
        .get("/api/parks?hasAgilityEquipment=true")
        .expect(200)
        .then((res) => {
          res.body.forEach((park: Park) => {
            expect(typeof park.name).toBe("string");
            expect(typeof park.desc).toBe("string");
            expect(typeof park.size).toBe("number");
            expect(typeof park.current_average_rating).toBe("number");
            expect(typeof park.current_review_count).toBe("number");
            expect(Array.isArray(park.features)).toBe(false);
            expect(typeof park.features).toBe("object");
            expect(typeof park.opening_hours).toBe("object");
            expect(typeof park.opening_hours.monday).toBe("string");
            expect(typeof park.opening_hours.tuesday).toBe("string");
            expect(typeof park.opening_hours.wednesday).toBe("string");
            expect(typeof park.opening_hours.thursday).toBe("string");
            expect(typeof park.opening_hours.friday).toBe("string");
            expect(typeof park.opening_hours.saturday).toBe("string");
            expect(typeof park.opening_hours.sunday).toBe("string");
            expect(typeof park.address).toBe("object");
            expect(typeof park.address.firstLine).toBe("string");
            expect(typeof park.address.secondLine).toBe("string");
            expect(typeof park.address.postCode).toBe("string");
            expect(typeof park.address.city).toBe("string");
            expect(typeof park.location).toBe("object");
            expect(typeof park.location.long).toBe("string");
            expect(typeof park.location.lat).toBe("string");
            expect(typeof park.image_url).toBe("string");
            expect(typeof park.website_url).toBe("string");
            expect(typeof park.phone_number).toBe("string");
          });
        });
    });
    test("expect all returned parks to have hasAgilityEquipment = true", () => {
      return request(app)
        .get("/api/parks?hasAgilityEquipment=true")
        .expect(200)
        .then((res) => {
          res.body.forEach((park: Park) => {
            expect(park.features.hasAgilityEquipment).toBe(true);
          });
        });
    });
  });
  describe("Can filter parks by isFullyEnclosed", () => {
    test("should return an array", () => {
      return request(app)
        .get("/api/parks?isFullyEnclosed=true")
        .expect(200)
        .then((res) => {
          expect(Array.isArray(res.body)).toBe(true);
          expect(res.body.length).toBe(4);
        });
    });
    test("returned array should contain park objects ", () => {
      return request(app)
        .get("/api/parks?isFullyEnclosed=true")
        .expect(200)
        .then((res) => {
          res.body.forEach((park: Park) => {
            expect(typeof park.name).toBe("string");
            expect(typeof park.desc).toBe("string");
            expect(typeof park.size).toBe("number");
            expect(typeof park.current_average_rating).toBe("number");
            expect(typeof park.current_review_count).toBe("number");
            expect(Array.isArray(park.features)).toBe(false);
            expect(typeof park.features).toBe("object");
            expect(typeof park.opening_hours).toBe("object");
            expect(typeof park.opening_hours.monday).toBe("string");
            expect(typeof park.opening_hours.tuesday).toBe("string");
            expect(typeof park.opening_hours.wednesday).toBe("string");
            expect(typeof park.opening_hours.thursday).toBe("string");
            expect(typeof park.opening_hours.friday).toBe("string");
            expect(typeof park.opening_hours.saturday).toBe("string");
            expect(typeof park.opening_hours.sunday).toBe("string");
            expect(typeof park.address).toBe("object");
            expect(typeof park.address.firstLine).toBe("string");
            expect(typeof park.address.secondLine).toBe("string");
            expect(typeof park.address.postCode).toBe("string");
            expect(typeof park.address.city).toBe("string");
            expect(typeof park.location).toBe("object");
            expect(typeof park.location.long).toBe("string");
            expect(typeof park.location.lat).toBe("string");
            expect(typeof park.image_url).toBe("string");
            expect(typeof park.website_url).toBe("string");
            expect(typeof park.phone_number).toBe("string");
          });
        });
    });
    test("expect all returned parks to have isFullyEnclosed = true", () => {
      return request(app)
        .get("/api/parks?isFullyEnclosed=true")
        .expect(200)
        .then((res) => {
          res.body.forEach((park: Park) => {
            expect(park.features.isFullyEnclosed).toBe(true);
          });
        });
    });
  });
  describe("Can filter parks by hasDisabledAccess", () => {
    test("should return an array", () => {
      return request(app)
        .get("/api/parks?hasDisabledAccess=true")
        .expect(200)
        .then((res) => {
          expect(Array.isArray(res.body)).toBe(true);
          expect(res.body.length).toBe(3);
        });
    });
    test("returned array should contain park objects ", () => {
      return request(app)
        .get("/api/parks?hasDisabledAccess=true")
        .expect(200)
        .then((res) => {
          res.body.forEach((park: Park) => {
            expect(typeof park.name).toBe("string");
            expect(typeof park.desc).toBe("string");
            expect(typeof park.size).toBe("number");
            expect(typeof park.current_average_rating).toBe("number");
            expect(typeof park.current_review_count).toBe("number");
            expect(Array.isArray(park.features)).toBe(false);
            expect(typeof park.features).toBe("object");
            expect(typeof park.opening_hours).toBe("object");
            expect(typeof park.opening_hours.monday).toBe("string");
            expect(typeof park.opening_hours.tuesday).toBe("string");
            expect(typeof park.opening_hours.wednesday).toBe("string");
            expect(typeof park.opening_hours.thursday).toBe("string");
            expect(typeof park.opening_hours.friday).toBe("string");
            expect(typeof park.opening_hours.saturday).toBe("string");
            expect(typeof park.opening_hours.sunday).toBe("string");
            expect(typeof park.address).toBe("object");
            expect(typeof park.address.firstLine).toBe("string");
            expect(typeof park.address.secondLine).toBe("string");
            expect(typeof park.address.postCode).toBe("string");
            expect(typeof park.address.city).toBe("string");
            expect(typeof park.location).toBe("object");
            expect(typeof park.location.long).toBe("string");
            expect(typeof park.location.lat).toBe("string");
            expect(typeof park.image_url).toBe("string");
            expect(typeof park.website_url).toBe("string");
            expect(typeof park.phone_number).toBe("string");
          });
        });
    });

    test("expect all returned parks to have hasDisabledAccess = true", () => {
      return request(app)
        .get("/api/parks?hasDisabledAccess=true")
        .expect(200)
        .then((res) => {
          res.body.forEach((park: Park) => {
            expect(park.features.hasDisabledAccess).toBe(true);
          });
        });
    });
  });
  describe("can order results", () => {
    test("should be able to order by rating", () => {
      return request(app)
        .get("/api/parks?orderBy=current_average_rating:asc")
        .expect(200)
        .then((res) => {
          console.log(res.body);
          expect(res.body).toEqual(    [
            {
              id: 'park_8',
              features: {
                isFreeParking: false,
                isFree: true,
                isParking: true,
                hasDisabledAccess: true,
                hasAgilityEquipment: false,
                isWellLit: false,
                isFullyEnclosed: false
              },
              current_average_rating: 0,
              address: {
                city: 'London',
                secondLine: '',
                postCode: 'SW1A 2BJ',
                firstLine: "St. James's Park"
              },
              size: 57,
              website_url: 'https://www.stjamesparkwebsite.com/',
              image_url: 'https://www.stjamespark.com/',
              name: "St. James's Park",
              opening_hours: {
                sunday: '5am - 12am',
                saturday: '5am - 12am',
                tuesday: '5am - 12am',
                wednesday: '5am - 12am',
                thursday: '5am - 12am',
                friday: '5am - 12am',
                monday: '5am - 12am'
              },
              current_review_count: 0,
              location: { long: '-0.132995', lat: '51.502174' },
              phone_number: '0987654321',
              desc: 'A beautiful park near Buckingham Palace, known for its lake, pelicans, and iconic views of the London Eye.'
            },
            {
              id: 'park_1',
              features: {
                isFreeParking: false,
                isFree: false,
                isParking: false,
                hasDisabledAccess: false,
                hasAgilityEquipment: true,
                isWellLit: true,
                isFullyEnclosed: true
              },
              current_average_rating: 4,
              address: {
                city: 'Birmingham',
                secondLine: 'Jewel Court',
                postCode: 'B1 3LE',
                firstLine: '29 LEGGE LANE'
              },
              size: 6,
              website_url: 'https://www.parkwebsite.com/',
              image_url: 'https://www.park.com/',
              name: 'Shelfield Park',
              opening_hours: {
                sunday: '8am - 5pm',
                saturday: '8am - 5pm',
                tuesday: '8am - 5pm',
                wednesday: '8am - 5pm',
                thursday: '8am - 5pm',
                friday: '8am - 5pm',
                monday: '8am - 5pm'
              },
              current_review_count: 1,
              location: { long: '-1.902585', lat: '52.498464' },
              phone_number: '07800989434',
              desc: "A park containing two full-size football pitches, a football and basketball cage, and a children's soft play area."
            },
            {
              id: 'park_3',
              features: {
                isFreeParking: true,
                isFree: true,
                isParking: false,
                hasDisabledAccess: false,
                hasAgilityEquipment: false,
                isWellLit: true,
                isFullyEnclosed: false
              },
              current_average_rating: 4.2,
              address: {
                city: 'London',
                secondLine: '',
                postCode: 'NW1 4NR',
                firstLine: "Regent's Park"
              },
              size: 410,
              website_url: 'https://www.regentsparkwebsite.com/',
              image_url: 'https://www.regentspark.com/',
              name: "Regent's Park",
              opening_hours: {
                sunday: '5am - 9:30pm',
                saturday: '5am - 9:30pm',
                tuesday: '5am - 9:30pm',
                wednesday: '5am - 9:30pm',
                thursday: '5am - 9:30pm',
                friday: '5am - 9:30pm',
                monday: '5am - 9:30pm'
              },
              current_review_count: 1,
              location: { long: '-0.152813', lat: '51.527272' },
              phone_number: '0987654321',
              desc: 'One of the Royal Parks of London, featuring open spaces, a lake, gardens, and the famous London Zoo.'
            },
            {
              id: 'park_5',
              features: {
                isFreeParking: true,
                isFree: true,
                isParking: true,
                hasDisabledAccess: false,
                hasAgilityEquipment: false,
                isWellLit: true,
                isFullyEnclosed: true
              },
              current_average_rating: 4.3,
              address: {
                city: 'London',
                secondLine: '',
                postCode: 'E9 7HN',
                firstLine: 'Victoria Park'
              },
              size: 86,
              website_url: 'https://www.victoriaparkwebsite.com/',
              image_url: 'https://www.victoriapark.com/',
              name: 'Victoria Park',
              opening_hours: {
                sunday: '7am - 10pm',
                saturday: '7am - 10pm',
                tuesday: '7am - 10pm',
                wednesday: '7am - 10pm',
                thursday: '7am - 10pm',
                friday: '7am - 10pm',
                monday: '7am - 10pm'
              },
              current_review_count: 1,
              location: { long: '-0.038823', lat: '51.536067' },
              phone_number: '0912345678',
              desc: "One of London's oldest public parks, offering open spaces, lakes, sports facilities, and various events."
            },
            {
              id: 'park_7',
              features: {
                isFreeParking: false,
                isFree: false,
                isParking: true,
                hasDisabledAccess: false,
                hasAgilityEquipment: false,
                isWellLit: true,
                isFullyEnclosed: false
              },
              current_average_rating: 4.4,
              address: {
                city: 'London',
                secondLine: '',
                postCode: 'SE10 8XJ',
                firstLine: 'Greenwich Park'
              },
              size: 183,
              website_url: 'https://www.greenwichparkwebsite.com/',
              image_url: 'https://www.greenwichpark.com/',
              name: 'Greenwich Park',
              opening_hours: {
                sunday: '6am - 9:30pm',
                saturday: '6am - 9:30pm',
                tuesday: '6am - 9:30pm',
                wednesday: '6am - 9:30pm',
                thursday: '6am - 9:30pm',
                friday: '6am - 9:30pm',
                monday: '6am - 9:30pm'
              },
              current_review_count: 1,
              location: { long: '-0.002853', lat: '51.476852' },
              phone_number: '0901234567',
              desc: 'A historic park with stunning views of London, featuring the Royal Observatory, deer enclosure, and beautiful gardens.'
            },
            {
              id: 'park_2',
              features: {
                isFreeParking: false,
                isFree: false,
                isParking: true,
                hasDisabledAccess: true,
                hasAgilityEquipment: false,
                isWellLit: false,
                isFullyEnclosed: true
              },
              current_average_rating: 4.5,
              address: {
                city: 'London',
                secondLine: '',
                postCode: 'W2 2UH',
                firstLine: 'Hyde Park'
              },
              size: 350,
              website_url: 'https://www.hydeparkwebsite.com/',
              image_url: 'https://www.hydepark.com/',
              name: 'Hyde Park',
              opening_hours: {
                sunday: '6am - 10:30pm',
                saturday: '6am - 10:30pm',
                tuesday: '6am - 10:30pm',
                wednesday: '6am - 10:30pm',
                thursday: '6am - 10:30pm',
                friday: '6am - 10:30pm',
                monday: '6am - 10:30pm'
              },
              current_review_count: 1,
              location: { long: '-0.166791', lat: '51.507268' },
              phone_number: '01234567890',
              desc: "One of London's eight Royal Parks, offering recreational activities, events, and beautiful landscapes."
            },
            {
              id: 'park_6',
              features: {
                isFreeParking: false,
                isFree: false,
                isParking: true,
                hasDisabledAccess: false,
                hasAgilityEquipment: false,
                isWellLit: false,
                isFullyEnclosed: true
              },
              current_average_rating: 4.6,
              address: {
                city: 'London',
                secondLine: '',
                postCode: 'W2 2UH',
                firstLine: 'Kensington Gardens'
              },
              size: 275,
              website_url: 'https://www.kensingtongardenswebsite.com/',
              image_url: 'https://www.kensingtongardens.com/',
              name: 'Kensington Gardens',
              opening_hours: {
                sunday: '6am - 9pm',
                saturday: '6am - 9pm',
                tuesday: '6am - 9pm',
                wednesday: '6am - 9pm',
                thursday: '6am - 9pm',
                friday: '6am - 9pm',
                monday: '6am - 9pm'
              },
              current_review_count: 1,
              location: { long: '-0.181806', lat: '51.507739' },
              phone_number: '0765432109',
              desc: 'A peaceful garden in the heart of London, featuring beautiful landscapes, the Serpentine Gallery, and Kensington Palace.'
            },
            {
              id: 'park_4',
              features: {
                isFreeParking: true,
                isFree: false,
                isParking: true,
                hasDisabledAccess: true,
                hasAgilityEquipment: false,
                isWellLit: false,
                isFullyEnclosed: false
              },
              current_average_rating: 4.7,
              address: {
                city: 'London',
                secondLine: '',
                postCode: 'TW10 5HS',
                firstLine: 'Richmond Park'
              },
              size: 2500,
              website_url: 'https://www.richmondparkwebsite.com/',
              image_url: 'https://www.richmondpark.com/',
              name: 'Richmond Park',
              opening_hours: {
                sunday: '7am - 9:30pm',
                saturday: '7am - 9:30pm',
                tuesday: '7am - 9:30pm',
                wednesday: '7am - 9:30pm',
                thursday: '7am - 9:30pm',
                friday: '7am - 9:30pm',
                monday: '7am - 9:30pm'
              },
              current_review_count: 1,
              location: { long: '-0.276805', lat: '51.442251' },
              phone_number: '0765432109',
              desc: 'The largest Royal Park in London, famous for its deer herds, stunning landscapes, and tranquil atmosphere.'
            },
            {
              id: 'park_9',
              features: {
                isFreeParking: true,
                isFree: true,
                isParking: true,
                hasDisabledAccess: false,
                hasAgilityEquipment: false,
                isWellLit: false,
                isFullyEnclosed: false
              },
              current_average_rating: 5,
              address: {
                city: 'London',
                secondLine: '',
                postCode: 'SW11 4NJ',
                firstLine: 'Battersea Park'
              },
              size: 200,
              website_url: 'https://www.batterseaparkwebsite.com/',
              image_url: 'https://www.batterseapark.com/',
              name: 'Battersea Park',
              opening_hours: {
                sunday: '6:30am - 10:30pm',
                saturday: '6:30am - 10:30pm',
                tuesday: '6:30am - 10:30pm',
                wednesday: '6:30am - 10:30pm',
                thursday: '6:30am - 10:30pm',
                friday: '6:30am - 10:30pm',
                monday: '6:30am - 10:30pm'
              },
              current_review_count: 5,
              location: { long: '-0.161365', lat: '51.477187' },
              phone_number: '0765432109',
              desc: 'A large riverside park offering recreational activities, gardens, boating, and stunning views of the River Thames.'
            }
          ]);
        });
    });
  });
});

describe("compound queries", () => {
  test("should return compund queries", () => {
    return request(app)
      .get(
        "/api/parks?isFree=true&isWellLit=true&orderBy=current_average_rating:desc"
      )
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual([
          {
            id: "park_5",
            features: {
              isFreeParking: true,
              isFree: true,
              isParking: true,
              hasDisabledAccess: false,
              hasAgilityEquipment: false,
              isWellLit: true,
              isFullyEnclosed: true,
            },
            current_average_rating: 4.3,
            address: {
              city: "London",
              secondLine: "",
              postCode: "E9 7HN",
              firstLine: "Victoria Park",
            },
            size: 86,
            website_url: "https://www.victoriaparkwebsite.com/",
            image_url: "https://www.victoriapark.com/",
            name: "Victoria Park",
            opening_hours: {
              sunday: "7am - 10pm",
              saturday: "7am - 10pm",
              tuesday: "7am - 10pm",
              wednesday: "7am - 10pm",
              thursday: "7am - 10pm",
              friday: "7am - 10pm",
              monday: "7am - 10pm",
            },
            current_review_count: 1,
            location: { long: "-0.038823", lat: "51.536067" },
            phone_number: "0912345678",
            desc: "One of London's oldest public parks, offering open spaces, lakes, sports facilities, and various events.",
          },
          {
            id: "park_3",
            features: {
              isFreeParking: true,
              isFree: true,
              isParking: false,
              hasDisabledAccess: false,
              hasAgilityEquipment: false,
              isWellLit: true,
              isFullyEnclosed: false,
            },
            current_average_rating: 4.2,
            address: {
              city: "London",
              secondLine: "",
              postCode: "NW1 4NR",
              firstLine: "Regent's Park",
            },
            size: 410,
            website_url: "https://www.regentsparkwebsite.com/",
            image_url: "https://www.regentspark.com/",
            name: "Regent's Park",
            opening_hours: {
              sunday: "5am - 9:30pm",
              saturday: "5am - 9:30pm",
              tuesday: "5am - 9:30pm",
              wednesday: "5am - 9:30pm",
              thursday: "5am - 9:30pm",
              friday: "5am - 9:30pm",
              monday: "5am - 9:30pm",
            },
            current_review_count: 1,
            location: { long: "-0.152813", lat: "51.527272" },
            phone_number: "0987654321",
            desc: "One of the Royal Parks of London, featuring open spaces, a lake, gardens, and the famous London Zoo.",
          },
        ]);
        res.body.forEach((park: Park) => {
          expect(park.features.isFree).toBe(true);
          expect(park.features.isWellLit).toBe(true);
        });
      });
  });
  test("should return compund queries", () => {
    return request(app)
      .get("/api/parks?isFreeParking=true&isWellLit=true&orderBy=name:asc")
      .expect(200)
      .then((res) => {
        res.body.forEach((park: Park) => {
          expect(park.features.isFreeParking).toBe(true);
          expect(park.features.isWellLit).toBe(true);
        });
        expect(res.body).toEqual([
          {
            id: "park_3",
            features: {
              isFreeParking: true,
              isFree: true,
              isParking: false,
              hasDisabledAccess: false,
              hasAgilityEquipment: false,
              isWellLit: true,
              isFullyEnclosed: false,
            },
            current_average_rating: 4.2,
            address: {
              city: "London",
              secondLine: "",
              postCode: "NW1 4NR",
              firstLine: "Regent's Park",
            },
            size: 410,
            website_url: "https://www.regentsparkwebsite.com/",
            image_url: "https://www.regentspark.com/",
            name: "Regent's Park",
            opening_hours: {
              sunday: "5am - 9:30pm",
              saturday: "5am - 9:30pm",
              tuesday: "5am - 9:30pm",
              wednesday: "5am - 9:30pm",
              thursday: "5am - 9:30pm",
              friday: "5am - 9:30pm",
              monday: "5am - 9:30pm",
            },
            current_review_count: 1,
            location: { long: "-0.152813", lat: "51.527272" },
            phone_number: "0987654321",
            desc: "One of the Royal Parks of London, featuring open spaces, a lake, gardens, and the famous London Zoo.",
          },
          {
            id: "park_5",
            features: {
              isFreeParking: true,
              isFree: true,
              isParking: true,
              hasDisabledAccess: false,
              hasAgilityEquipment: false,
              isWellLit: true,
              isFullyEnclosed: true,
            },
            current_average_rating: 4.3,
            address: {
              city: "London",
              secondLine: "",
              postCode: "E9 7HN",
              firstLine: "Victoria Park",
            },
            size: 86,
            website_url: "https://www.victoriaparkwebsite.com/",
            image_url: "https://www.victoriapark.com/",
            name: "Victoria Park",
            opening_hours: {
              sunday: "7am - 10pm",
              saturday: "7am - 10pm",
              tuesday: "7am - 10pm",
              wednesday: "7am - 10pm",
              thursday: "7am - 10pm",
              friday: "7am - 10pm",
              monday: "7am - 10pm",
            },
            current_review_count: 1,
            location: { long: "-0.038823", lat: "51.536067" },
            phone_number: "0912345678",
            desc: "One of London's oldest public parks, offering open spaces, lakes, sports facilities, and various events.",
          },
        ]);
      });
  });
});
