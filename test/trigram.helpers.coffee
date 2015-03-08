describe 'helpers', () ->
  fixture = namespace 'trigram.helpers'
  test = 'one two three four'

  it 'should extract n-words from the head of a string', () ->
    actual = fixture.extractWords test, 2, true
    expect(actual).toEqual 'one two'

  it 'should remove n-words from the head of a string', () ->
    actual = fixture.removeWords test, 1, true
    expect(actual).toEqual 'two three four'

  it 'should extract n-words from the tail of a string', () ->
    actual = fixture.extractWords test, 2, false
    expect(actual).toEqual 'three four'

  it 'should remove n-words from the tail of a string', () ->
    actual = fixture.removeWords test, 1, false
    expect(actual).toEqual 'one two three'
