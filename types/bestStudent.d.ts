export type TBestStudent = {
  id: string
  score: number
  grade: number
  sector: string
  lastName: string
  firstName: string
};

export type TBestStudentUI = {
  name: string
  score: number
  sector: string
  avatar: { src: string }
};

export type TBestStudentsResponse = {
  latestCycleYear: number
  bestStudents: Array<TBestStudentUI>
}