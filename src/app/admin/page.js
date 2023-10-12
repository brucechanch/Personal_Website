'use client'

import AdminAboutView from '@/components/admin-view/about'
import AdminContactView from '@/components/admin-view/contact'
import AdminEducationView from '@/components/admin-view/education'
import AdminExperienceView from '@/components/admin-view/experience'
import AdminHomeView from '@/components/admin-view/home'
import AdminProjectView from '@/components/admin-view/project'
import React, { useState, useEffect } from 'react'
import { addData, getData, updateData } from '@/services'

const initialHomeFormData = {
  heading: '',
  summary: '',
}

const initialAboutFormData = {
  aboutme: '',
  noofprojects: '',
  yearofexperience: '',
  noofclients: '',
  skills: '',
}

const initialExperienceFormData = {
  position: '',
  company: '',
  duration: '',
  location: '',
  jobprofile: '',
}

const initialEducationFormData = {
  degree: '',
  year: '',
  college: '',
}

const initialProjectFormData = {
  name: '',
  technologies: '',
  website: '',
  github: '',
}

export default function AdminView() {
  const [currentSelectedTab, setCurrentSelectedTab] = useState('home')
  const [homeViewFormData, setHomeViewFormData] = useState(initialHomeFormData)
  const [aboutViewFormData, setAboutViewFormData] =
    useState(initialAboutFormData)
  const [experienceViewFormData, setExperienceViewFormData] = useState(
    initialExperienceFormData
  )
  const [educationViewFormData, setEducationViewFormData] = useState(
    initialEducationFormData
  )
  const [projectViewFormData, setProjectViewFormData] = useState(
    initialProjectFormData
  )

  const [allData, setAllData] = useState({})
  const [update, setUpdate] = useState(false)

  const menuItems = [
    {
      id: 'home',
      label: 'Home',
      component: (
        <AdminHomeView
          formData={homeViewFormData}
          setFormData={setHomeViewFormData}
          handleSaveData={handleSaveData}
        />
      ),
    },
    {
      id: 'about',
      label: 'About',
      component: (
        <AdminAboutView
          formData={aboutViewFormData}
          setFormData={setAboutViewFormData}
          handleSaveData={handleSaveData}
        />
      ),
    },
    {
      id: 'experience',
      label: 'Experience',
      component: (
        <AdminExperienceView
          formData={experienceViewFormData}
          handleSaveData={handleSaveData}
          setFormData={setExperienceViewFormData}
          data={allData?.experience}
        />
      ),
    },
    {
      id: 'education',
      label: 'Education',
      component: (
        <AdminEducationView
          formData={educationViewFormData}
          handleSaveData={handleSaveData}
          setFormData={setEducationViewFormData}
          data={allData?.education}
        />
      ),
    },
    {
      id: 'project',
      label: 'Project',
      component: (
        <AdminProjectView
          formData={projectViewFormData}
          handleSaveData={handleSaveData}
          setFormData={setProjectViewFormData}
          data={allData?.project}
        />
      ),
    },
    {
      id: 'contact',
      label: 'Contact',
      component: <AdminContactView />,
    },
  ]

  async function extractAllDatas() {
    const response = await getData(currentSelectedTab)
    if (
      currentSelectedTab === 'home' &&
      response &&
      response.data &&
      response.data.length
    ) {
      setHomeViewFormData(response && response.data[0])
      setUpdate(true)
    }

    if (
      currentSelectedTab === 'about' &&
      response &&
      response.data &&
      response.data.length
    ) {
      setAboutViewFormData(response && response.data[0])
      setUpdate(true)
    }

    if (response?.success) {
      setAllData({
        ...allData,
        [currentSelectedTab]: response && response.data,
      })
    }
  }

  async function handleSaveData() {
    const dataMap = {
      home: homeViewFormData,
      about: aboutViewFormData,
      education: educationViewFormData,
      experience: experienceViewFormData,
      project: projectViewFormData,
    }

    const response = update
      ? await updateData(currentSelectedTab, dataMap[currentSelectedTab])
      : await addData(currentSelectedTab, dataMap[currentSelectedTab])
    console.log(response, 'response')

    if (response.success) {
      resetFormDatas()
      extractAllDatas()
    }
  }

  useEffect(() => {
    extractAllDatas()
  }, [currentSelectedTab])

  function resetFormDatas() {
    setHomeViewFormData(initialHomeFormData)
    setAboutViewFormData(initialAboutFormData)
    setEducationViewFormData(initialEducationFormData)
    setExperienceViewFormData(initialExperienceFormData)
    setProjectViewFormData(initialProjectFormData)
  }

  console.log(allData, homeViewFormData, 'homeViewFormData')
  console.log(allData, aboutViewFormData, 'aboutViewFormData')
  return (
    <div className='border-b border-gray-200'>
      <nav className='-mb-0.5 flex justify-center space-x-6' role='tablist'>
        {menuItems.map((item) => (
          <button
            key={item.id}
            type='button'
            className='p-4 font-bold text-xl text-black'
            onClick={() => {
              setCurrentSelectedTab(item.id)
              resetFormDatas()
              setUpdate(false)
            }}
          >
            {item.label}
          </button>
        ))}
      </nav>
      <div className='mt-10 p-10 '>
        {menuItems.map(
          (item) => item.id === currentSelectedTab && item.component
        )}
      </div>
    </div>
  )
}
