export interface TLabel {
  label?: string;
  titleId?: string;
}

export interface TValueLabel {
  label?: string;
  value?: string;
}

export interface TTitleIdLabel {
  label?: string;
  titleId?: string;
}

export const isNo = [ // 1是，0否
  {
    label: "是",
    value: "1"
  },
  {
    label: "否",
    value: "0"
  }
]
