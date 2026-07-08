import jsonSamples from "./samples.json"

type SampleData = string

export const SAMPLES: SampleData[] = jsonSamples.map((item) => item.sample)
