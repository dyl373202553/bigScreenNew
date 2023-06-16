export interface OptionsLable {
  title?: string;
  img?: string;
  path?: string;
}

// 保障任务
export const taskLabel = [
  {
    label: "任务名称",
    titleId: "name",
    width: 120
  },
  {
    label: "执行单位",
    titleId: "companyName",
  },
  {
    label: "状态",
    titleId: "status", // 1：未开始，2：进行中，3：已完成
  },
  {
    label: "开始时间",
    titleId: "beginTime",
    width: 90
  }
];

export const activeLabl = [
{
    label: "",
    titleId: "taskName"
  },
  {
    label: "",
    titleId: "stratTime",
    width: 90
  }
]

// 三情
export const articleLabel = [
  {
    label: "",
    titleId: "articleName"
  },
  {
    label: "",
    titleId: "createTime",
    width: 90
  }
]
