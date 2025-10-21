import { itemSchemas } from "../src/api/v1/validations/itemValidation";

describe("Validation Schemas", () => {
  it("should validate correct create item data", () => {
    const { error } = itemSchemas.create!.body!.validate({
      name: "Test Item",
      description: "Some description",
      price: 50,
    });
    expect(error).toBeUndefined();
  });

  it("should fail when name is missing", () => {
    const { error } = itemSchemas.create!.body!.validate({
      description: "Missing name",
      price: 10,
    });
    expect(error?.details[0].message).toContain("Name is required");
  });

  it("should fail when price is negative", () => {
    const { error } = itemSchemas.create!.body!.validate({
      name: "Bad Item",
      description: "Negative price",
      price: -10,
    });
    expect(error?.details[0].message).toContain("Price must greater than 0");
  });
  
});
