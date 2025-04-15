import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react';
import { Bars3Icon, XMarkIcon, BellIcon } from '@heroicons/react/24/outline';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { JSX } from 'react/jsx-runtime';

interface NavigationItem {
  name: string;
  href: string;
  description: string;
}

const navigation: NavigationItem[] = [
  { name: 'Dashboard', href: '/Dashboard', description: 'View your expenses and financial summary' },
  { name: 'Categories', href: '/Categories', description: 'Manage and organize expense categories' },
  { name: 'Expense', href: '/Expense', description: '' },
  { name: 'Report', href: '/Report', description: 'Generate and download financial reports' },

];

export default function Navbar(): JSX.Element {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<NavigationItem[]>([]);

  function handleSearch(query: string) {
    setSearchQuery(query);
    if (query.trim() === '') {
      setSearchResults([]);
      return;
    }

    const filteredResults = navigation.filter(item =>
      item.description.toLowerCase().includes(query.toLowerCase())
    );

    setSearchResults(filteredResults);
  }

  return (
    <>
      <Disclosure as="nav" className="bg-gray-700 sticky top-0 z-50">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                {/* Mobile Menu Button */}
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray hover:bg-purple-900 focus:ring-2 focus:ring-white focus:outline-none focus:ring-inset">
                    {open ? (
                      <XMarkIcon aria-hidden="true" className="size-6" />
                    ) : (
                      <Bars3Icon aria-hidden="true" className="size-6" />
                    )}
                  </DisclosureButton>
                </div>

                {/* Navigation Links (Desktop) */}
                <div className="hidden sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>

                {/* Search Bar */}
                

                {/* Right Section: Notification & Profile Menu */}
                <div className="inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  {/* Notification Bell */}
                  <button className="relative rounded-full bg-purple-700 p-1 text-white hover:text-gray-200 focus:ring-2 focus:ring-white">
                    <BellIcon className="size-6" />
                  </button>

                  {/* Profile Dropdown Menu */}
                  <div className="relative">
                    <Menu as="div" className="relative ml-3">
                      <MenuButton className="relative flex rounded-full bg-purple-700 text-sm focus:ring-2 focus:ring-white">
                        <img alt="" src="expen.png" className="size-8 rounded-full" />
                      </MenuButton>
                      <div className="overflow-visible">
                        <MenuItems className="absolute right-25 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg">
                          <MenuItem>
                            {({ active }) => (
                              <a href="/your-Profile" className={`block px-4 py-2 text-sm text-gray-700 ${active ? 'bg-gray-100' : ''}`}>
                                Your Profile
                              </a>
                            )}
                          </MenuItem>
                          <MenuItem>
                            {({ active }) => (
                              <a href="/Setting" className={`block px-4 py-2 text-sm text-gray-700 ${active ? 'bg-gray-100' : ''}`}>
                                Settings
                              </a>
                            )}
                          </MenuItem>
                          <MenuItem>
                            {({ active }) => (
                              <button onClick={() => { localStorage.removeItem('userToken'); navigate('/login'); }} className={`block w-full text-left px-4 py-2 text-sm text-gray-700 ${active ? 'bg-gray-100' : ''}`}>
                                Sign out
                              </button>
                            )}
                          </MenuItem>
                        </MenuItems>
                      </div>
                    </Menu>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Navigation Menu */}
            <DisclosurePanel className="sm:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </DisclosurePanel>
          </>
        )}
      </Disclosure>
    </>
  );
}
