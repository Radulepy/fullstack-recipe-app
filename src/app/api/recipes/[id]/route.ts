// REST example
// const recipeService = new RecipeService();

// export async function GET(
//   req: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   const recipe = await recipeService.getRecipeById(Number(params.id));
//   if (!recipe) {
//     return NextResponse.json({ error: 'Recipe not found' }, { status: 404 });
//   }
//   return NextResponse.json(recipe);
// }

// export async function PUT(
//   req: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   const data = await req.json();
//   const updated = await recipeService.updateRecipe(Number(params.id), data);
//   if (!updated) {
//     return NextResponse.json({ error: 'Recipe not found' }, { status: 404 });
//   }
//   return NextResponse.json(updated);
// }

// export async function DELETE(
//   req: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   await recipeService.deleteRecipe(Number(params.id));
//   return NextResponse.json({ success: true });
// }