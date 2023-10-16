import ClientAboutView from '@/components/client-view/about'
import ClientContactView from '@/components/client-view/contact'
import ClientExperienceAndEducationView from '@/components/client-view/experience'
import ClientHomeView from '@/components/client-view/home'
import ClientProjectView from '@/components/client-view/project'

async function extractAllDatas(currentSection) {
  const res = await fetch(`http://localhost:3000/api/${currentSection}/get`, {
    method: 'GET',
    cache: 'no-store',
  })

  const data = await res.json()

  return data && data.data
}

export default async function Home() {
  const homeSectionData = await extractAllDatas('home')
  const aboutSectionData = await extractAllDatas('about')
  const experienceSectionData = await extractAllDatas('experience')
  const projectSectionData = await extractAllDatas('project')
  const educationSectionData = await extractAllDatas('education')

  return (
    <div>
      <ClientHomeView data={homeSectionData} />
      <ClientAboutView data={homeSectionData} />
      <ClientExperienceAndEducationView
        educationData={educationSectionData}
        experienceData={homeSectionData}
      />
      <ClientProjectView data={projectSectionData} />
      <ClientContactView />
    </div>
  )
}
