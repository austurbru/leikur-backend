"use strict";

module.exports = {
  lifecycles: {
    async beforeCreate(data) {
      var level = await strapi.query("level").findOne({ id: data.level });

      if (level && data.level && data.lessonNo) {
        data.key = `${level.levelNo}-${data.lessonNo}`;
      }

      if (data.key) {
        var res = data.key.split("-");
        data.levelNo = res[0];
      }

      if (data.pages) {
        //This generates the slug in each and every page in the lesson
        for (let i = 0; i < data.pages.length; i++) {
          data.pages[i].pageInfo = {
            pageNo: i + 1,
            slug: `${data.key}-${i + 1}`,
          };
        }
      }
    },

    async beforeUpdate(params, data) {
      var level = await strapi.query("level").findOne({ id: data.level });

      if (level && data.level && data.lessonNo) {
        data.key = `${level.levelNo}-${data.lessonNo}`;
      }

      if (data.key) {
        var res = data.key.split("-");
        data.levelNo = res[0];
      }

      if (data.pages) {
        //This generates the slug in each and every page in the lesson
        for (let i = 0; i < data.pages.length; i++) {
          data.pages[i].pageInfo = {
            pageNo: i + 1,
            slug: `${data.key}-${i + 1}`,
          };
        }
      }
    },
  },
};
