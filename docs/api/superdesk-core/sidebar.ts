import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "api/superdesk-core/superdesk-rundowns-api",
    },
    {
      type: "category",
      label: "Rundowns",
      items: [
        {
          type: "doc",
          id: "api/superdesk-core/list-shows",
          label: "List Shows",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/superdesk-core/create-show",
          label: "Create Show",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/superdesk-core/get-show",
          label: "Get Show",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/superdesk-core/update-show",
          label: "Update Show",
          className: "api-method patch",
        },
        {
          type: "doc",
          id: "api/superdesk-core/delete-show",
          label: "Delete Show",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "api/superdesk-core/list-templates-for-the-show",
          label: "List Templates for the Show",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/superdesk-core/create-new-template",
          label: "Create new Template",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/superdesk-core/get-template",
          label: "Get Template",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/superdesk-core/update-template",
          label: "Update Template",
          className: "api-method patch",
        },
        {
          type: "doc",
          id: "api/superdesk-core/delete-template",
          label: "Delete Template",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "api/superdesk-core/list-rundowns",
          label: "List Rundowns",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/superdesk-core/create-rundown",
          label: "Create Rundown",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/superdesk-core/list-rundown-items",
          label: "List Rundown Items",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/superdesk-core/create-rundown-item",
          label: "Create Rundown Item",
          className: "api-method post",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
