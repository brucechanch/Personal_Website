import ClientAboutView from '@/components/client-view/about'
import ClientContactView from '@/components/client-view/contact'
import ClientExperienceAndEducationView from '@/components/client-view/experience'
import ClientHomeView from '@/components/client-view/home'
import ClientProjectView from '@/components/client-view/project'
import axios from 'axios'

async function extractAllDatas(currentSection: string) {
  try {
    const res = await axios({
      method: 'GET',
      url: `https://personal-website-54s22nt1c-as-projects-6c9300c4.vercel.app/api/${currentSection}/get`,
    })

    if (res.data) {
      return res.data.data // 返回响应数据中的 data 字段
    }
  } catch (error) {
    console.error('请求数据时出错：', error)
    return null // 或者返回适当的错误信息
  }
}

export default async function Home() {
  const homeSectionData = await extractAllDatas('home')
  const aboutSectionData = await extractAllDatas('about')
  const experienceSectionData = await extractAllDatas('experience')
  const educationSectionData = await extractAllDatas('education')
  const projectSectionData = await extractAllDatas('project')

  return (
    <div>
      <ClientHomeView data={homeSectionData} />
      <ClientAboutView
        data={
          aboutSectionData && aboutSectionData.length ? aboutSectionData[0] : []
        }
      />
      <ClientExperienceAndEducationView
        educationData={educationSectionData}
        experienceData={experienceSectionData}
      />
      <ClientProjectView data={projectSectionData} />
      <ClientContactView />
    </div>
  )
}
