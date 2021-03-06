//Not in use yet -- this is just the desired data spec

var baseCards = {
  "searching" : {
    name: "It's Found You!",
    description: "You can hear it breathing from the other side of the door.",
    tags: ["bad", "monster"],

    userdata: { found: 0, hid: 0},

    effects: async (card, app) => {
      console.log("hello 12");
      var worryAmount = Math.ceil(Math.random() * 5);
      console.log("hello 14");
      app.worry(worryAmount);
      console.log("hello 16");
      await app.confirm("You can't handle this.");
      console.log("hello 18");
      var hid = card.userdata.hid;
      var found = card.userdata.found;
      app.message("A noise from the corner distracts it.");
      await app.confirm("You take advantage of the few seconds of respite...");
      if(Math.random() < (found / (found + hid))) {
        card.userdata.hid++;
        app.worry(2);
        app.message("The sound of its footsteps grow muffled in the distance as it stalks away ...");
        await app.confirm("... but you'll never believe it's gone.");
      } else {
        card.userdata.found++;
        await app.message("It hears you move, and quickly turns around.")
        await app.effect("monsterAttack");
      }
      return "done";
    }
  },
  "bleeding" : {
    name: "Open Wound",
    description: "The wound on your leg isn't healing well",
    tags: ["wound", "bad"],
    userdata : { count: 0},
    effects: async (card, app) => {
      app.damage(1);
      var count = card.get("count");
      count++;
      card.set("count", count);
      if(count > 5){
        await app.confirm("The loss of blood makes you weak.");
        await app.addCard("faint");
      }
      return "done";
    }
  }
};