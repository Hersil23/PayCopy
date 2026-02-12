"use client";

import BackButton from "@/components/BackButton";
import Logo from "@/components/Logo";

export default function PrivacidadPage() {
  return (
    <div className="py-6 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <BackButton href="/" />
      </div>

      <div className="flex justify-center mb-6">
        <Logo size="small" />
      </div>

      <h1 className="text-xl font-bold text-[#fafafa] mb-6">Política de Privacidad</h1>

      <div className="space-y-6 text-sm text-[#a1a1a1] leading-relaxed">
        <p className="text-[#737373] text-xs">Última actualización: 12 de febrero de 2026</p>

        <section>
          <h2 className="text-[#fafafa] font-semibold text-base mb-2">1. Información General</h2>
          <p>
            PayCopy (&quot;la App&quot;) es una herramienta web creada por Herasi Silva
            (&quot;nosotros&quot;) que permite a los usuarios compartir sus datos de pago
            de forma organizada mediante enlaces. La App está disponible en{" "}
            <a href="https://paycopy.app" className="text-[#ea580c] hover:underline">
              paycopy.app
            </a>.
          </p>
        </section>

        <section>
          <h2 className="text-[#fafafa] font-semibold text-base mb-2">2. Datos que Recopilamos</h2>
          <p className="mb-2">
            <strong className="text-[#fafafa]">No recopilamos datos personales.</strong> PayCopy
            fue diseñada con la privacidad como prioridad:
          </p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>No tenemos servidores ni bases de datos.</li>
            <li>No creamos cuentas de usuario.</li>
            <li>No rastreamos tu actividad.</li>
            <li>No usamos cookies de rastreo.</li>
            <li>No compartimos datos con terceros.</li>
            <li>No usamos herramientas de analítica (Google Analytics, etc.).</li>
          </ul>
        </section>

        <section>
          <h2 className="text-[#fafafa] font-semibold text-base mb-2">3. Almacenamiento Local</h2>
          <p>
            La App utiliza <strong className="text-[#fafafa]">localStorage</strong> del navegador
            para guardar los métodos de pago que configuras. Estos datos:
          </p>
          <ul className="list-disc list-inside space-y-1 ml-2 mt-2">
            <li>Se almacenan exclusivamente en tu dispositivo.</li>
            <li>Nunca se envían a ningún servidor.</li>
            <li>Solo tú puedes acceder a ellos.</li>
            <li>Puedes eliminarlos en cualquier momento desde la App o borrando los datos del navegador.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-[#fafafa] font-semibold text-base mb-2">4. Enlaces de Cobro</h2>
          <p>
            Cuando generas un enlace de cobro, los datos de pago se codifican directamente
            en la URL (en formato Base64). Esto significa que:
          </p>
          <ul className="list-disc list-inside space-y-1 ml-2 mt-2">
            <li>Los datos viajan en el enlace, no se almacenan en ningún servidor.</li>
            <li>Cualquier persona con el enlace puede ver los datos incluidos.</li>
            <li>Tú controlas con quién compartes el enlace.</li>
            <li>No podemos acceder, modificar ni eliminar enlaces generados.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-[#fafafa] font-semibold text-base mb-2">5. Cookies</h2>
          <p>
            PayCopy <strong className="text-[#fafafa]">no utiliza cookies</strong> de ningún tipo.
            No usamos cookies de rastreo, publicitarias ni de analítica. El único mecanismo de
            almacenamiento es localStorage, que es controlado completamente por tu navegador.
          </p>
        </section>

        <section>
          <h2 className="text-[#fafafa] font-semibold text-base mb-2">6. Servicios de Terceros</h2>
          <p>La App utiliza los siguientes servicios de terceros:</p>
          <ul className="list-disc list-inside space-y-1 ml-2 mt-2">
            <li>
              <strong className="text-[#fafafa]">Vercel</strong> — para el alojamiento de la
              aplicación web. Vercel puede recopilar datos técnicos estándar del servidor
              (dirección IP, tipo de navegador) según su propia{" "}
              <a
                href="https://vercel.com/legal/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#ea580c] hover:underline"
              >
                política de privacidad
              </a>.
            </li>
            <li>
              <strong className="text-[#fafafa]">Google Fonts</strong> — para cargar la tipografía
              Inter. Google puede recibir tu dirección IP al cargar las fuentes.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-[#fafafa] font-semibold text-base mb-2">7. Seguridad</h2>
          <p>
            La App se sirve a través de HTTPS, lo que garantiza que la comunicación entre
            tu navegador y nuestros servidores está cifrada. Sin embargo, los datos incluidos
            en los enlaces de cobro son visibles para cualquiera que tenga acceso al enlace.
            Te recomendamos compartir los enlaces solo con personas de confianza.
          </p>
        </section>

        <section>
          <h2 className="text-[#fafafa] font-semibold text-base mb-2">8. Menores de Edad</h2>
          <p>
            PayCopy no está dirigida a menores de 13 años. No recopilamos intencionalmente
            información de menores de edad.
          </p>
        </section>

        <section>
          <h2 className="text-[#fafafa] font-semibold text-base mb-2">9. Tus Derechos (GDPR / RGPD)</h2>
          <p>
            Si te encuentras en la Unión Europea o el Espacio Económico Europeo, tienes
            derecho a:
          </p>
          <ul className="list-disc list-inside space-y-1 ml-2 mt-2">
            <li>Acceder a tus datos — todos están en tu dispositivo (localStorage).</li>
            <li>Eliminar tus datos — puedes borrar tus métodos desde la App o limpiar los datos del navegador.</li>
            <li>Portabilidad — los datos están en tu navegador y en los enlaces que generas.</li>
          </ul>
          <p className="mt-2">
            Como no almacenamos datos personales en servidores, estos derechos se ejercen
            directamente desde tu dispositivo.
          </p>
        </section>

        <section>
          <h2 className="text-[#fafafa] font-semibold text-base mb-2">10. Cambios en esta Política</h2>
          <p>
            Podemos actualizar esta política ocasionalmente. Cualquier cambio será publicado
            en esta página con la fecha de actualización correspondiente.
          </p>
        </section>

        <section>
          <h2 className="text-[#fafafa] font-semibold text-base mb-2">11. Contacto</h2>
          <p>
            Si tienes preguntas sobre esta política de privacidad, puedes contactarnos en:{" "}
            <a
              href="mailto:herasisilva@gmail.com"
              className="text-[#ea580c] hover:underline"
            >
              herasisilva@gmail.com
            </a>
          </p>
        </section>
      </div>

      <footer className="text-center mt-10 pb-4">
        <p className="text-[#737373] text-xs">
          Creado por{" "}
          <a
            href="https://herasi.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#a1a1a1] hover:text-[#ea580c] transition-colors"
          >
            @herasi.dev
          </a>
        </p>
      </footer>
    </div>
  );
}
