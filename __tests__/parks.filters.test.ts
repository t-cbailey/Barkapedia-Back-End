import request from "supertest";
import app from "../app";
import { Park } from "../types/CustomTypes";
import { seedDatabase } from "../db/seed/seed";
import { orderChecker } from "../utils/testUtils";

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
            expect(typeof park.user_id).toBe("string");
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
            expect(typeof park.user_id).toBe("string");
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
            expect(typeof park.user_id).toBe("string");
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
            expect(typeof park.user_id).toBe("string");
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
            expect(typeof park.user_id).toBe("string");
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
            expect(typeof park.user_id).toBe("string");
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
            expect(typeof park.user_id).toBe("string");
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
  describe("Can order results", () => {
    test("should be able to order asc", () => {
      return request(app)
        .get("/api/parks?orderBy=current_average_rating:asc")
        .expect(200)
        .then((res) => {
          const input = res.body;
          expect(orderChecker(input, "current_average_rating", "asc")).toBe(
            true
          );
        });
    });
  });
  test("should be able to order desc", () => {
    return request(app)
      .get("/api/parks?orderBy=current_average_rating:desc")
      .expect(200)
      .then((res) => {
        const input = res.body;
        expect(orderChecker(input, "current_average_rating", "desc")).toBe(
          true
        );
      });
  });
});

describe("compound queries", () => {
  test("should return compound queries", () => {
    return request(app)
      .get(
        "/api/parks?isFree=true&isWellLit=true&orderBy=current_average_rating:asc"
      )
      .expect(200)
      .then((res) => {
        const input = res.body;
        expect(orderChecker(input, "current_average_rating", "asc")).toBe(true);
        res.body.forEach((park: Park) => {
          expect(park.features.isFree).toBe(true);
          expect(park.features.isWellLit).toBe(true);
        });
      });
  });
  test("should return compound queries", () => {
    return request(app)
      .get("/api/parks?isFreeParking=true&isWellLit=true&orderBy=name:desc")
      .expect(200)
      .then((res) => {
        const input = res.body;
        expect(orderChecker(input, "name", "asc")).toBe(true);
        res.body.forEach((park: Park) => {
          expect(park.features.isFreeParking).toBe(true);
          expect(park.features.isWellLit).toBe(true);
        });
      });
  });
});
