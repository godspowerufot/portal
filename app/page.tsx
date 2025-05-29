import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { GraduationCap, Heart, Users, Award, MapPin, Phone, Mail } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="container mx-auto  px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12  rounded-full flex items-center justify-center">
   <Image
                src="/nursing.jpg"
                alt="Nursing students in clinical practice"
                width={50}
                height={50}
                className="rounded-lg shadow-xl"
              />              </div>
              <div>
                <h1 className="text-xl font-bold text-black">AICONS</h1>
                <p className="text-sm text-gray-600">Akwa Ibom College of Nursing Sciences</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="#home" className="text-black hover:text-green-600 transition-colors">
                Home
              </Link>
              <Link href="#about" className="text-black hover:text-green-600 transition-colors">
                About
              </Link>
              <Link href="#programs" className="text-black hover:text-green-600 transition-colors">
                Programs
              </Link>
              <Link href="#contact" className="text-black hover:text-green-600 transition-colors">
                Contact
              </Link>
            </nav>
            <div className="flex items-center space-x-3">
              <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
             <Link href={"/login"}>Login</Link>   
              </Button>
              <Button className="bg-darkGreen hover:bg-green-700 text-white">
                
                
                <Link href={"/register"}> Register </Link></Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black leading-tight">
                Excellence in <span className="text-green-600">Nursing Education</span>
              </h1>
              <p className="text-lg text-gray-700 leading-relaxed">
                Akwa Ibom College of Nursing Sciences is committed to producing competent, compassionate, and skilled
                nursing professionals who will serve our communities with dedication and excellence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-darkGreen hover:bg-green-700 text-white">
                  Apply Now
                </Button>
                <Button size="lg" variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                  Learn More
                </Button>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/nursing.jpg"
                alt="Nursing students in clinical practice"
                width={600}
                height={500}
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
              About Akwa Ibom College of Nursing Sciences
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Established to meet the growing demand for qualified nursing professionals in Akwa Ibom State and Nigeria
              at large.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <GraduationCap className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-black mb-2">Quality Education</h3>
                <p className="text-gray-600">
                  Comprehensive nursing programs designed to meet international standards and prepare students for
                  global practice.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <Users className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-black mb-2">Expert Faculty</h3>
                <p className="text-gray-600">
                  Experienced and qualified nursing educators committed to mentoring the next generation of healthcare
                  professionals.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <Award className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-black mb-2">Accreditation</h3>
                <p className="text-gray-600">
                  Fully accredited by the Nursing and Midwifery Council of Nigeria (NMCN) ensuring recognized
                  qualifications.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Image
                src="https://myschoolgist.com/wp-content/uploads/2023/10/school-of-nursing.webp"
                alt="Modern nursing laboratory"
                width={500}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-black">Our Mission</h3>
              <p className="text-gray-700 leading-relaxed">
               The mission of Akwa Ibom State School of Nursing is to foster sustainable socio-economic development, use knowledge and technology, and unlock the hidden treasures of nature and the human mind. They aim to use education as a catalyst for rapid industrialization, produce graduates readily employable, and generate employment opportunities. Additionally, the school strives to be a learning institution that promotes knowledge, excellence, and the spirit of inquiry, offering opportunities for learning, leadership, service, and self-actualization
              </p>
              {/* <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-darkGreen rounded-full mt-2"></div>
                  <p className="text-gray-700">State-of-the-art simulation laboratories</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-darkGreen rounded-full mt-2"></div>
                  <p className="text-gray-700">Clinical partnerships with leading hospitals</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-darkGreen rounded-full mt-2"></div>
                  <p className="text-gray-700">Comprehensive student support services</p>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">Our Programs</h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
Akwa Ibom State offers various nursing programs, including general nursing and midwifery, through several colleges of nursing sciences. These programs are available at the College of Nursing Sciences in Anua-Uyo, Ituk-Mbang, Iquita-Oron, Ikot-Ekpene, and Eket. Admissions are now processed through the JAMB portal.             </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <Image
                  src="https://myschoolgist.com/wp-content/uploads/2022/07/School-of-Nursing.avif"
                  alt="Basic Nursing Program"
                  width={400}
                  height={200}
                  className="rounded-lg mb-6 w-full"
                />
                <h3 className="text-xl font-semibold text-black mb-3">Basic Nursing Program</h3>
                <p className="text-gray-600 mb-4">
                  A comprehensive 3-year program leading to Registered Nurse (RN) certification. Covers fundamental
                  nursing principles, clinical skills, and professional practice.
                </p>
                <Button className="bg-darkGreen hover:bg-green-700 text-white">Learn More</Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <Image
                  src="schoolnurse.jpeg"
                  alt="Post-Basic Nursing Program"
                  width={400}
                  height={200}
                  className="rounded-lg mb-6 w-full"
                />
                <h3 className="text-xl font-semibold text-black mb-3">Post-Basic Nursing Program</h3>
                <p className="text-gray-600 mb-4">
                  Advanced nursing specializations including Midwifery, Psychiatric Nursing, Community Health, and
                  Critical Care Nursing.
                </p>
                <Button className="bg-darkGreen hover:bg-green-700 text-white">Learn More</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">Get In Touch</h2>
            <p className="text-lg text-gray-700">
              Ready to start your nursing career? Contact us for more information.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <MapPin className="w-8 h-8 text-green-600 mx-auto mb-3" />
              <h3 className="font-semibold text-black mb-2">Address</h3>
              <p className="text-gray-600">
                Akwa Ibom State
                <br />
                Nigeria
              </p>
            </div>

            <div className="text-center">
              <Phone className="w-8 h-8 text-green-600 mx-auto mb-3" />
              <h3 className="font-semibold text-black mb-2">Phone</h3>
              <p className="text-gray-600">+234 XXX XXX XXXX</p>
            </div>

            <div className="text-center">
              <Mail className="w-8 h-8 text-green-600 mx-auto mb-3" />
              <h3 className="font-semibold text-black mb-2">Email</h3>
              <p className="text-gray-600">info@aicons.edu.ng</p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button size="lg" className="bg-darkGreen hover:bg-green-700 text-white">
              Contact Us Today
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-darkGreen rounded-full flex items-center justify-center">
   <Image
                src="/nursing.jpg"
                alt="Nursing students in clinical practice"
                width={50}
                height={50}
                className="rounded-lg shadow-xl"
              />                </div>
                <div>
                  <h3 className="font-bold">AICONS</h3>
                  <p className="text-sm text-gray-400">Excellence in Nursing</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm">
                Preparing the next generation of nursing professionals with excellence and compassion.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#home" className="text-gray-400 hover:text-green-400">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="#about" className="text-gray-400 hover:text-green-400">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#programs" className="text-gray-400 hover:text-green-400">
                    Programs
                  </Link>
                </li>
                <li>
                  <Link href="#contact" className="text-gray-400 hover:text-green-400">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Programs</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-green-400">
                    Basic Nursing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-green-400">
                    Post-Basic Nursing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-green-400">
                    Midwifery
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-green-400">
                    Community Health
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <div className="space-y-3">
                <Button className="w-full bg-darkGreen hover:bg-green-700 text-white">Apply Now</Button>
                <Button
                  variant="outline"
                  className="w-full border-green-600 text-green-400 hover:bg-darkGreen hover:text-white"
                >
                  Student Portal
                </Button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">© 2024 Akwa Ibom College of Nursing Sciences. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
