"use strict";

module.exports = {
  lifecycles: {
    async beforeCreate(data) {
      // Get an object wich is the Level that the lesson belongs to
      var level = await strapi.query("level").findOne({ id: data.level });
      //If we have a level and the lesson has a lesson Number...
      if (level && data.lessonNo) {
        //...we can generate a key
        data.key = `${level.levelNo}-${data.lessonNo}`;
      }

      //getting the level from the key and assign it to a member variable: levelNo
      if (data.key) {
        var res = data.key.split("-");
        data.levelNo = res[0];
      }

      if (data.pages) {
        //This generates the slug in each and every page in the lesson
        //Puts the page number and the total page count of the lesson
        for (let i = 0; i < data.pages.length; i++) {
          data.pages[i].pageInfo = {
            pageNo: i + 1,
            slug: `${data.key}-${i + 1}`,
            lessonTotalPageCount: data.pages.length,
          };
        }
      }
    },

    //Need to be fixed, Duplication of code---

    async beforeUpdate(params, data) {
      var level = await strapi.query("level").findOne({ id: data.level });

      if (level && data.lessonNo) {
        data.key = `${level.levelNo}-${data.lessonNo}`;
      }

      if (data.key) {
        var res = data.key.split("-");
        data.levelNo = res[0];
      }

      if (data.pages) {
        //This generates the slug in each and every page in the lesson
        //Puts the page number and the total page count of the lesson
        for (let i = 0; i < data.pages.length; i++) {
          data.pages[i].pageInfo = {
            pageNo: i + 1,
            slug: `${data.key}-${i + 1}`,
            lessonTotalPageCount: data.pages.length,
          };
        }
      }
    },
  },
  //---------------------------------------------------
};
