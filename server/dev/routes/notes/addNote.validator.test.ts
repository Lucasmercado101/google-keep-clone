import Joi from "joi";
import { newNoteSchema } from "./addNote.validator";

describe("Joi.attempt", () => {
  describe("should fail if", () => {
    it("nothing was passed", () =>
      expect(() => Joi.attempt({}, newNoteSchema)).toThrow());

    it("valid data but no title or content was passed", () =>
      expect(() =>
        Joi.attempt(
          { color: "red", pinned: false, archived: true, labelIds: [1, 2] },
          newNoteSchema
        )
      ).toThrow());

    it("title isn't a string/number", () => {
      expect(() => Joi.attempt({ title: false }, newNoteSchema)).toThrow();
      expect(() => Joi.attempt({ title: [] }, newNoteSchema)).toThrow();
      expect(() => Joi.attempt({ title: {} }, newNoteSchema)).toThrow();
      expect(() => Joi.attempt({ title: null }, newNoteSchema)).toThrow();
      expect(() => Joi.attempt({ title: undefined }, newNoteSchema)).toThrow();
    });

    it("content isn't a string/number", () => {
      expect(() => Joi.attempt({ content: [] }, newNoteSchema)).toThrow();
      expect(() => Joi.attempt({ content: null }, newNoteSchema)).toThrow();
      expect(() =>
        Joi.attempt({ content: undefined }, newNoteSchema)
      ).toThrow();
      expect(() => Joi.attempt({ content: {} }, newNoteSchema)).toThrow();
      expect(() => Joi.attempt({ content: false }, newNoteSchema)).toThrow();
    });

    it("pinned isn't a boolean or undefined", () => {
      expect(() =>
        Joi.attempt({ title: "a", pinned: "a" }, newNoteSchema)
      ).toThrow();
      expect(() =>
        Joi.attempt({ title: "a", pinned: [] }, newNoteSchema)
      ).toThrow();
      expect(() =>
        Joi.attempt({ title: "a", pinned: {} }, newNoteSchema)
      ).toThrow();
      expect(() =>
        Joi.attempt({ title: "a", pinned: null }, newNoteSchema)
      ).toThrow();
    });

    it("archived isn't a boolean or undefined", () => {
      expect(() =>
        Joi.attempt({ title: "a", archived: "a" }, newNoteSchema)
      ).toThrow();
      expect(() =>
        Joi.attempt({ title: "a", archived: [] }, newNoteSchema)
      ).toThrow();
      expect(() =>
        Joi.attempt({ title: "a", archived: {} }, newNoteSchema)
      ).toThrow();
      expect(() =>
        Joi.attempt({ title: "a", archived: null }, newNoteSchema)
      ).toThrow();
    });

    it("color is invalid", () => {
      //   valid colors:
      //   -  red
      //   -  orange
      //   -  yellow
      //   -  green
      //   -  teal
      //   -  blue
      //   -  darkblue
      //   -  purple
      //   -  pink
      //   -  brown
      //   -  gray

      expect(() =>
        Joi.attempt({ color: "Lusty Gallant", title: "a" }, newNoteSchema)
      ).toThrow();
      expect(() =>
        Joi.attempt({ color: {}, title: "a" }, newNoteSchema)
      ).toThrow();
      expect(() =>
        Joi.attempt({ color: [], title: "a" }, newNoteSchema)
      ).toThrow();
      expect(() =>
        Joi.attempt({ color: 123, title: "a" }, newNoteSchema)
      ).toThrow();
    });

    it("both pinned and archived passed are true", () =>
      expect(() =>
        Joi.attempt({ pinned: true, archived: true, title: "a" }, newNoteSchema)
      ).toThrow());

    it("labelIds isn't an array of numbers", () => {
      expect(() =>
        Joi.attempt({ labelIds: 1, title: "a" }, newNoteSchema)
      ).toThrow();
      expect(() =>
        Joi.attempt({ labelIds: "asd", title: "a" }, newNoteSchema)
      ).toThrow();
      expect(() =>
        Joi.attempt({ labelIds: null, title: "a" }, newNoteSchema)
      ).toThrow();
      expect(() =>
        Joi.attempt({ labelIds: {}, title: "a" }, newNoteSchema)
      ).toThrow();
      expect(() =>
        Joi.attempt({ labelIds: false, title: "a" }, newNoteSchema)
      ).toThrow();
      expect(() =>
        Joi.attempt({ labelIds: ["asd"], title: "a" }, newNoteSchema)
      ).toThrow();
      expect(() =>
        Joi.attempt({ labelIds: [{}], title: "a" }, newNoteSchema)
      ).toThrow();
      expect(() =>
        Joi.attempt({ labelIds: [null], title: "a" }, newNoteSchema)
      ).toThrow();
      expect(() =>
        Joi.attempt({ labelIds: [false], title: "a" }, newNoteSchema)
      ).toThrow();
      expect(() =>
        Joi.attempt({ labelIds: [undefined], title: "a" }, newNoteSchema)
      ).toThrow();
    });
  });

  describe("should succeed if", () => {
    it("only title was passed", () => {
      expect(() => Joi.attempt({ title: "a" }, newNoteSchema)).not.toThrow;
    });
    it("only content was passed", () => {
      expect(() => Joi.attempt({ content: "a" }, newNoteSchema)).not.toThrow;
    });

    describe("title/content was passed and", () => {
      it("valid pinned", () => {
        expect(() => Joi.attempt({ title: "a", pinned: true }, newNoteSchema))
          .not.toThrow;
        expect(() =>
          Joi.attempt({ content: "a", pinned: false }, newNoteSchema)
        ).not.toThrow;
      });
      it("valid archived", () => {
        expect(() => Joi.attempt({ title: "a", archived: true }, newNoteSchema))
          .not.toThrow;
        expect(() =>
          Joi.attempt({ content: "a", archived: false }, newNoteSchema)
        ).not.toThrow;
      });
      it("valid labelIds", () => {
        expect(() =>
          Joi.attempt({ title: "a", labelIds: [1, 2, 44] }, newNoteSchema)
        ).not.toThrow;
        expect(() =>
          Joi.attempt({ content: "a", labelIds: [10, 50, 25] }, newNoteSchema)
        ).not.toThrow;
      });
      it("valid color", () => {
        expect(() => Joi.attempt({ title: "a", color: "red" }, newNoteSchema))
          .not.toThrow;
        expect(() => Joi.attempt({ content: "a", color: "red" }, newNoteSchema))
          .not.toThrow;
      });
      it("valid pinned & archived", () => {
        expect(() =>
          Joi.attempt(
            { title: "a", pinned: true, archived: false },
            newNoteSchema
          )
        ).not.toThrow;
        expect(() =>
          Joi.attempt(
            { content: "a", pinned: false, archived: true },
            newNoteSchema
          )
        ).not.toThrow;
      });
    });
  });

  it("if passed valid title/content only it should return an object with title/content casted to string and archived & pinned both false", () => {
    let joiReturnData;

    joiReturnData = Joi.attempt({ title: "a" }, newNoteSchema);
    expect(joiReturnData).toMatchObject({
      title: "a",
      archived: false,
      pinned: false
    });

    joiReturnData = Joi.attempt({ title: 50 }, newNoteSchema);
    expect(joiReturnData).toMatchObject({
      title: "50",
      archived: false,
      pinned: false
    });

    joiReturnData = Joi.attempt({ content: "a" }, newNoteSchema);
    expect(joiReturnData).toMatchObject({
      content: "a",
      archived: false,
      pinned: false
    });

    joiReturnData = Joi.attempt({ content: 100 }, newNoteSchema);
    expect(joiReturnData).toMatchObject({
      content: "100",
      archived: false,
      pinned: false
    });
  });
});
