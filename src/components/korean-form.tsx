import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ProfileForm() {
  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          안녕하세요, 김지환님!
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="age">나이: 세</Label>
          <Input id="age" type="number" className="max-w-[120px]" />
        </div>

        <div className="space-y-2">
          <Label>성별</Label>
          <RadioGroup defaultValue="male" className="flex gap-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="male" id="male" />
              <Label htmlFor="male">남성</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="female" id="female" />
              <Label htmlFor="female">여성</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label htmlFor="height">키 (cm)</Label>
          <Input id="height" type="number" className="max-w-[120px]" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="education">출발력</Label>
          <Select>
            <SelectTrigger className="w-full max-w-[200px]">
              <SelectValue placeholder="선택하세요" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="high">고졸</SelectItem>
              <SelectItem value="college">대졸</SelectItem>
              <SelectItem value="graduate">대학원졸</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>노선: 호선</Label>
          <Input type="text" className="max-w-[200px]" />
        </div>

        <div className="space-y-2">
          <Label>상/하행 여부</Label>
          <RadioGroup defaultValue="up" className="flex gap-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="up" id="up" />
              <Label htmlFor="up">상행</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="down" id="down" />
              <Label htmlFor="down">하행</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label>역 출발 시각</Label>
          <Input type="time" className="max-w-[200px]" />
        </div>

        <div className="space-y-2">
          <Label>위도</Label>
          <Input type="number" step="0.000001" className="max-w-[200px]" />
        </div>
      </CardContent>
    </Card>
  )
}

