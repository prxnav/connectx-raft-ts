export function installDefaultData() {
  if (typeof localStorage === "undefined") return;
  if (!localStorage.getItem("people_data")) {
    const DEFAULT_DATA = {
      "John Doe": {
        "Jane Doe": "Friend",
      },
      "Jane Doe": {
        "John Doe": "Friend",
      },
      Charles: {
        Elizabeth: "Son",
      },
      Elizabeth: {
        Charles: "Mother",
      },
      Sachin: {
        Arjun: "Father",
      },
      Arjun: {
        Sachin: "Son",
      },
    };

    localStorage.setItem("people_data", JSON.stringify(DEFAULT_DATA));
  }
}
