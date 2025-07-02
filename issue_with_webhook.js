const url =
  "https://discord.com/api/webhooks/...?with_components=true";

const body = {
  type: 0,
  content: "",
  components: [
    {
      type: 1,
      components: [
        {
          type: 10,
          text: "Raw content",
        },
      ],
    },
    {
      type: 1,
      components: [
        {
          type: 10,
          text: "## Some title",
        },
      ],
    },
    {
      type: 1,
      components: [
        {
          type: 14,
          spacing: 2,
          divider: true,
        },
      ],
    },
    {
      type: 1,
      components: [
        {
          type: 10,
          text: `Hello world`,
        },
      ],
    },
    {
      type: 1,
      components: [
        {
          type: 14,
          spacing: 2,
          divider: true,
        },
      ],
    },
    {
      type: 1,
      components: [
        {
          type: 2,
          style: 5,
          label: "Linked button",
          url: "https://discord.com/",
        },
      ],
    },
  ],
};

await fetch(url, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
});
