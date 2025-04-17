import { ProductType, Topic } from "types"
import { MultiSelectOption } from "./MultiSelect"

export const GRID_DISRUPTOR_INDICES = [3, 9, 17, 27]


export function convertTypePayloadLiteToMultiSelectOption(
  type: ProductType,
): MultiSelectOption {
  return {
    label: type.title,
    value: type.slug,
  }
}

export function convertTopicPayloadLiteToMultiSelectOption(
  topic: Topic,
): MultiSelectOption {
  return {
    label: topic.title,
    value: topic.slug,
  }
}