# Guia de Substituição de Imagens - Pousada Villa & Mar

Este documento explica onde e como substituir as imagens placeholder (temporárias) por fotos reais do estabelecimento.

## ⚠️ Importante: Todas as imagens atualmente são placeholders!

As imagens atuais são de um serviço de placeholder (picsum.photos) e **devem ser substituídas por fotos reais da Pousada Villa & Mar**.

---

## 📸 Imagens Necessárias

### 1. Hero (Seção Principal - Tela Inicial)
**Arquivo:** `/components/Hero.tsx`

**Localização no código:** Linha ~12
```tsx
src="https://picsum.photos/id/354/1920/1080"
```

**Especificações:**
- **Resolução mínima:** 1920x1080 pixels (Full HD)
- **Orientação:** Horizontal (paisagem)
- **Conteúdo:** Vista panorâmica da Praia da Enseada em São Francisco do Sul
- **Horário ideal:** Pôr do sol ou manhã ensolarada para criar atmosfera acolhedora
- **Formato:** JPG ou WebP otimizado
- **Peso máximo:** 500KB (otimizar antes de usar)

**Dicas:**
- A foto deve transmitir tranquilidade e beleza natural
- Evitar muitas pessoas na foto
- Céu bonito e mar calmo são ideais

---

### 2. About (Sobre a Pousada)
**Arquivo:** `/components/About.tsx`

#### Imagem 1 - Área Externa/Fachada
**Localização no código:** Linha ~13
```tsx
src="https://picsum.photos/id/1018/600/800"
```

**Especificações:**
- **Resolução:** 600x800 pixels
- **Orientação:** Vertical (retrato)
- **Conteúdo:** Fachada da pousada ou área externa (jardim, entrada)
- **Formato:** JPG otimizado
- **Peso máximo:** 200KB

#### Imagem 2 - Vista da Praia ou Interior Aconchegante
**Localização no código:** Linha ~14
```tsx
src="https://picsum.photos/id/1019/600/800"
```

**Especificações:**
- **Resolução:** 600x800 pixels
- **Orientação:** Vertical (retrato)
- **Conteúdo:** Vista da praia próxima OU área interna acolhedora (sala de estar, cozinha)
- **Formato:** JPG otimizado
- **Peso máximo:** 200KB

---

### 3. Rooms (Acomodações) - 5 Fotos

#### Foto 1 - Suíte Master
**Arquivo:** `/constants.tsx`
**Localização:** Linha ~74
```tsx
imageUrl: 'https://picsum.photos/id/274/800/600'
```

**Especificações:**
- **Resolução:** 800x600 pixels
- **Orientação:** Horizontal
- **Conteúdo:** Suíte com banheiro privativo
- **Destaque:** Mostrar o banheiro privativo e/ou cama de casal
- **Formato:** JPG
- **Peso máximo:** 150KB

#### Fotos 2, 3, 4 e 5 - Quartos Standard
**Localização:** Linhas ~81, ~88, ~95, ~102

**Especificações para cada foto:**
- **Resolução:** 800x600 pixels
- **Orientação:** Horizontal
- **Conteúdo:** Interior dos quartos mostrando cama, ventilador, decoração
- **Variedade:** Fotografar ângulos diferentes para mostrar diversidade
- **Formato:** JPG
- **Peso máximo por foto:** 150KB

---

## 🛠️ Como Substituir as Imagens

### Opção 1: Hospedagem Externa (Recomendado)

1. **Faça upload das fotos para um serviço de hospedagem:**
   - Cloudinary (gratuito até 25GB)
   - ImgBB
   - ImageKit
   - Amazon S3
   - Google Cloud Storage

2. **Obtenha a URL pública de cada imagem**

3. **Substitua nos arquivos:**
   ```tsx
   // ANTES
   src="https://picsum.photos/id/274/800/600"
   
   // DEPOIS
   src="https://sua-hospedagem.com/suite-master.jpg"
   ```

### Opção 2: Pasta Public (Alternativa)

1. **Crie a pasta de imagens:**
   ```bash
   mkdir -p public/images/rooms
   mkdir -p public/images/hero
   mkdir -p public/images/about
   ```

2. **Coloque as fotos nas respectivas pastas:**
   ```
   public/
   └── images/
       ├── hero/
       │   └── praia-enseada.jpg
       ├── about/
       │   ├── fachada.jpg
       │   └── vista-praia.jpg
       └── rooms/
           ├── suite-master.jpg
           ├── quarto-1.jpg
           ├── quarto-2.jpg
           ├── quarto-3.jpg
           └── quarto-4.jpg
   ```

3. **Substitua as URLs nos arquivos:**
   ```tsx
   // ANTES
   src="https://picsum.photos/id/274/800/600"
   
   // DEPOIS
   src="/images/rooms/suite-master.jpg"
   ```

---

## 📏 Otimização de Imagens

Antes de fazer upload, **otimize sempre** suas imagens:

### Ferramentas Online Gratuitas:
- **TinyPNG** (tinypng.com) - Reduz até 70% do tamanho
- **Squoosh** (squoosh.app) - Google, converte para WebP
- **Compressor.io** - Compressão visual

### Dimensões Recomendadas:
```
Hero (principal):     1920x1080px
About (laterais):      600x800px
Quartos:               800x600px
```

### Formato Ideal:
- **WebP** (melhor compressão, suportado por todos navegadores modernos)
- **JPG** (boa compressão, compatibilidade universal)
- Evitar PNG para fotos (arquivos muito grandes)

---

## ✅ Checklist de Substituição

- [ ] Foto principal do Hero (Praia da Enseada)
- [ ] Foto 1 da seção About (Fachada/Externa)
- [ ] Foto 2 da seção About (Praia/Interior)
- [ ] Foto da Suíte Master
- [ ] Foto do Quarto Standard 1
- [ ] Foto do Quarto Standard 2
- [ ] Foto do Quarto Standard 3
- [ ] Foto do Quarto Standard 4
- [ ] Todas as fotos foram otimizadas
- [ ] Testei o site após substituir as imagens
- [ ] As fotos carregam rapidamente (< 2 segundos)

---

## 📞 Dúvidas?

Se tiver dificuldades, contate o desenvolvedor ou consulte a documentação do Vite:
https://vitejs.dev/guide/assets.html

---

**Última atualização:** Dezembro 2025
