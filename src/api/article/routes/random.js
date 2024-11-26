"use strict";

module.exports = {
  routes: [
    {
      method: "GET",
      path: "/article/random",
      handler: "random.getRandom",
      config: {
        "policies": []
      },
    },
  ],
};
