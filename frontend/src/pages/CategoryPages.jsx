import CategoryPage from './CategoryPage';

export function Men() {
  return (
    <CategoryPage
      category="men"
      title="Men"
      emoji="👔"
      subtitle="Shirts, Pants, T-Shirts, Jackets & more"
      gradient="from-blue-900 to-blue-700"
      accentColor="bg-blue-600"
      filterOptions={['Shirts', 'T-Shirts', 'Pants', 'Jackets']}
    />
  );
}

export function Women() {
  return (
    <CategoryPage
      category="women"
      title="Women"
      emoji="👗"
      subtitle="Dresses, Kurtis, Tops, Ethnic wear & more"
      gradient="from-pink-700 to-rose-500"
      accentColor="bg-pink-600"
      filterOptions={['Dresses', 'Tops', 'Pants', 'Ethnic']}
    />
  );
}

export function Kids() {
  return (
    <CategoryPage
      category="kids"
      title="Kids"
      emoji="🧒"
      subtitle="T-Shirts, Dresses, Sets, Ethnic wear & more"
      gradient="from-yellow-500 to-orange-400"
      accentColor="bg-orange-500"
      filterOptions={['T-Shirts', 'Dresses', 'Sets', 'Bottoms']}
    />
  );
}
