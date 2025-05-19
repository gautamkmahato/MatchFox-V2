import { Award, BookmarkCheck, Calendar, CheckCircle, ChevronDown, Clock, FileCheck, FileX, Mail, Phone, ThumbsDown, User } from "lucide-react"
import Image from "next/image"


export function Card(props) {
  return (
    <div
      {...props}
      className={`rounded-2xl border border-gray-100 bg-white shadow-sm ${props.className || ""}`}
    />
  )
}

export function CardHeader(props) {
  return (
    <div
      {...props}
      className={`flex flex-col space-y-1.5 p-6 ${props.className || ""}`}
    />
  )
}

export function CardTitle(props) {
  return (
    <h3
      {...props}
      className={`text-2xl font-semibold leading-none tracking-tight ${props.className || ""}`}
    />
  )
}

export function CardDescription(props) {
  return (
    <p
      {...props}
      className={`text-sm text-gray-500 ${props.className || ""}`}
    />
  )
}

export function CardContent(props) {
  return (
    <div
      {...props}
      className={`p-6 pt-0 ${props.className || ""}`}
    />
  )
}



const Progress = ({ value = 0, max = 100, className, ...props }, ref) => {
    const percentage = Math.min(100, (value / max) * 100)

    return (
      <div ref={ref} {...props} className={`relative h-3 w-full overflow-hidden rounded-full bg-gray-200 ${className || ""}`}>
        <div
          className="h-full bg-teal-800 transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    )
}




export default function UserDashboard() {
  return (
    <div className="min-h-screen dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* User Profile Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="relative">
              <div className="h-24 w-24 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-lg">
                <Image
                  src="/placeholder.svg?height=96&width=96"
                  alt="User profile"
                  width={96}
                  height={96}
                  className="object-cover"
                />
              </div>
              <div className="absolute bottom-0 right-0 bg-green-500 h-4 w-4 rounded-full border-2 border-white dark:border-gray-800"></div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Sarah Johnson</h1>
              <p className="text-gray-500 dark:text-gray-400">Software Engineer</p>
              <div className="flex flex-wrap gap-4 mt-2">
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <Mail className="h-4 w-4 mr-1" />
                  <span>sarah.johnson@example.com</span>
                </div>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <Phone className="h-4 w-4 mr-1" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <User className="h-4 w-4 mr-1" />
                  <span>ID: SJ12345</span>
                </div>
              </div>
            </div>
            <div className="ml-auto flex-shrink-0 hidden md:block">
              <div className="flex items-center gap-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow">
                <span className="text-sm font-semibold">Last active: Today</span>
                <Clock className="h-4 w-4 text-gray-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="bg-white dark:bg-gray-800 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-purple-500" />
                Total Interviews
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">24</div>
              <p className="text-xs text-gray-400 mt-1">+3 from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <BookmarkCheck className="h-5 w-5 mr-2 text-teal-500" />
                Saved Interviews
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">8</div>
              <p className="text-xs text-gray-400 mt-1">Pending review</p>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <ThumbsDown className="h-5 w-5 mr-2 text-red-500" />
                Rejected
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">10</div>
              <p className="text-xs text-gray-400 mt-1">42% rejection rate</p>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                Selected
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">6</div>
              <p className="text-xs text-gray-400 mt-1">25% success rate</p>
            </CardContent>
          </Card>
        </div>

        {/* Vento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-auto">
          {/* Large Card - Success Rate */}
          <Card className="md:col-span-2 lg:col-span-2 row-span-1 bg-white dark:bg-gray-800 shadow-sm">
            <CardHeader>
              <CardTitle>Interview Success Rate</CardTitle>
              <CardDescription>Your performance over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                      <span className="text-sm font-medium">Technical Interviews</span>
                    </div>
                    <span className="text-sm font-medium">75%</span>
                  </div>
                  <Progress value={75} className="h-2 bg-gray-200" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                      <span className="text-sm font-medium">HR Interviews</span>
                    </div>
                    <span className="text-sm font-medium">90%</span>
                  </div>
                  <Progress value={90} className="h-2 bg-gray-200" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                      <span className="text-sm font-medium">Case Studies</span>
                    </div>
                    <span className="text-sm font-medium">60%</span>
                  </div>
                  <Progress value={60} className="h-2 bg-gray-200" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Interview */}
          <Card className="md:col-span-1 lg:col-span-2 row-span-1 bg-white dark:bg-gray-800 shadow-sm">
            <CardHeader>
              <CardTitle>Upcoming Interview</CardTitle>
              <CardDescription>Next scheduled interview</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-4">
                <div className="bg-teal-100 dark:bg-teal-900/30 p-3 rounded-lg">
                  <Calendar className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                </div>
                <div>
                  <h3 className="font-semibold">Frontend Developer at TechCorp</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Tomorrow, 10:00 AM</p>
                  <div className="flex items-center mt-2 text-sm text-teal-600 dark:text-teal-400">
                    <span>View details</span>
                    <ChevronDown className="h-4 w-4 ml-1" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="md:col-span-2 lg:col-span-2 row-span-2 bg-white dark:bg-gray-800 shadow-sm">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest interview activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full">
                    <FileCheck className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Interview Completed</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Senior Developer at InnoTech</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">2 days ago</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded-full">
                    <FileX className="h-5 w-5 text-red-600 dark:text-red-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Application Rejected</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">UX Designer at DesignHub</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">5 days ago</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-full">
                    <Calendar className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Interview Scheduled</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Frontend Developer at TechCorp</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">1 week ago</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-teal-100 dark:bg-teal-900/30 p-2 rounded-full">
                    <BookmarkCheck className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Interview Saved</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Product Manager at GrowthCo</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">1 week ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Skills Assessment */}
          <Card className="md:col-span-1 lg:col-span-2 row-span-1 bg-white dark:bg-gray-800 shadow-sm">
            <CardHeader>
              <CardTitle>Skills Assessment</CardTitle>
              <CardDescription>Based on interview feedback</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Technical Skills</span>
                    <span className="font-medium">85%</span>
                  </div>
                  <Progress value={85} className="h-2 bg-gray-200" />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Communication</span>
                    <span className="font-medium">92%</span>
                  </div>
                  <Progress value={92} className="h-2 bg-gray-200" />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Problem Solving</span>
                    <span className="font-medium">78%</span>
                  </div>
                  <Progress value={78} className="h-2 bg-gray-200" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Top Companies */}
          <Card className="md:col-span-1 lg:col-span-2 row-span-1 bg-white dark:bg-gray-800 shadow-sm">
            <CardHeader>
              <CardTitle>Top Companies</CardTitle>
              <CardDescription>Where you've interviewed</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                      <span className="font-bold text-xs">TC</span>
                    </div>
                    <div className="flex flex-col gap-0">
                      <span className="text-sm text-gray-600">TechCorp</span>
                      <span className="text-xs text-gray-400">Software Developer</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Award className="h-4 w-4 text-yellow-500 mr-1" />
                    <span className="text-sm">3 interviews</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                      <span className="font-bold text-xs">IN</span>
                    </div>
                    <div className="flex flex-col gap-0">
                      <span className="text-sm text-gray-600">TechCorp</span>
                      <span className="text-xs text-gray-400">Software Developer</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Award className="h-4 w-4 text-yellow-500 mr-1" />
                    <span className="text-sm">2 interviews</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                      <span className="font-bold text-xs">DH</span>
                    </div>
                    <div className="flex flex-col gap-0">
                      <span className="text-sm text-gray-600">TechCorp</span>
                      <span className="text-xs text-gray-400">Software Developer</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Award className="h-4 w-4 text-yellow-500 mr-1" />
                    <span className="text-sm">1 interview</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
