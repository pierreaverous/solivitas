import Image from 'next/image';

export default function ExampleUsage() {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Comment utiliser vos images</h2>
      
      {/* Exemple d'utilisation d'une image locale */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2">Image locale (depuis public/images)</h3>
        <div className="relative h-64 w-full rounded-lg overflow-hidden">
          <Image
            src="/images/votre-image.jpg" // Remplacez par le nom de votre image
            alt="Description de l'image"
            fill
            className="object-cover"
          />
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Instructions :</h3>
        <ol className="list-decimal list-inside space-y-2">
          <li>Copiez vos images JPG dans le dossier <code>public/images</code></li>
          <li>Utilisez le chemin <code>/images/nom-de-votre-image.jpg</code> dans le composant Image</li>
          <li>Ajustez la taille avec les propriétés width/height ou fill</li>
          <li>N'oubliez pas d'ajouter une description alt pertinente</li>
        </ol>
      </div>
    </div>
  );
}